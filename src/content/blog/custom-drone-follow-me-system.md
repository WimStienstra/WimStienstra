---
title: "Building a Custom Drone Follow-Me System"
date: "2026-03-28"
slug: "custom-drone-follow-me-system"
tags: ["drone", "iot", "gps", "arduino"]
excerpt: "How I built a DIY GPS tracker for autonomous drone follow mode using Arduino and GPS modules"
coverImage: "/assets/blog/drone-follow-me-cover.jpg"
draft: false
---

# Building a Custom Drone Follow-Me System

As a drone flying enthusiast, I've always been frustrated by the limitations of commercial "follow-me" systems. They either require expensive accessories, rely on smartphone GPS (which is inaccurate), or only work with specific drone brands.

So I built my own GPS-based tracking beacon that any drone with a compatible flight controller can follow.

## The Problem with Built-In Follow-Me Modes

Most drones offer some form of follow-me functionality:

- **DJI ActiveTrack** — works great, but only for DJI drones (I fly both DJI and custom builds)
- **Smartphone GPS following** — inaccurate, drains battery, requires cell signal
- **Wrist-mounted trackers** — expensive (€200+), proprietary protocols

I wanted something:
- Universal (works with any flight controller that supports GPS waypoints)
- Accurate (RTK-level precision if possible)
- Affordable (under €50 in parts)
- DIY (learn how it works, modify as needed)

## Hardware Components

| Component | Purpose | Cost |
|-----------|---------|------|
| Arduino Nano | Microcontroller | €4 |
| NEO-6M GPS module | GPS receiver | €8 |
| HC-12 wireless module | Long-range telemetry (1km) | €6 |
| LiPo battery (2S 1000mAh) | Power | €10 |
| 3D printed enclosure | Housing | €2 (filament) |
| **Total** | | **€30** |

![Components laid out on workbench](/assets/blog/drone-components.jpg)

### Why HC-12 Instead of Bluetooth?

- **Range:** HC-12 can reach 1km in open space vs. Bluetooth's ~100m
- **Power:** Lower power consumption than WiFi
- **Simplicity:** Easy UART communication, no pairing needed

## Software Architecture

The system has two parts:

1. **Tracker (Arduino + GPS)** — worn by the pilot, broadcasts GPS position
2. **Drone (flight controller)** — receives position, calculates intercept course

```
┌─────────────┐          HC-12           ┌─────────────┐
│   Tracker   │ ────────────────────────> │    Drone    │
│ (Arduino +  │   GPS coords @ 1Hz       │  (Pixhawk/  │
│    GPS)     │                          │   ArduPilot)│
└─────────────┘                          └─────────────┘
```

### Tracker Code (Arduino)

```cpp
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

// GPS on pins 4 (RX), 3 (TX)
SoftwareSerial gpsSerial(4, 3);
TinyGPSPlus gps;

// HC-12 on pins 10 (RX), 11 (TX)
SoftwareSerial hc12(10, 11);

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  hc12.begin(9600);
  
  Serial.println("GPS Tracker v1.0");
}

void loop() {
  // Read GPS data
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }
  
  if (gps.location.isUpdated()) {
    // Send position over HC-12 in MAVLink format
    sendPosition(gps.location.lat(), gps.location.lng(), gps.altitude.meters());
  }
  
  delay(1000); // Update @ 1Hz
}

void sendPosition(double lat, double lon, double alt) {
  // Simple CSV format for now (can upgrade to MAVLink later)
  hc12.print("GPS,");
  hc12.print(lat, 7);
  hc12.print(",");
  hc12.print(lon, 7);
  hc12.print(",");
  hc12.println(alt, 2);
  
  Serial.print("Sent: ");
  Serial.print(lat, 7);
  Serial.print(", ");
  Serial.println(lon, 7);
}
```

### Drone Integration (ArduPilot)

ArduPilot has a "GUIDED" mode that accepts GPS waypoints via MAVLink. I wrote a small Python script running on a Raspberry Pi Zero mounted on the drone:

```python
from pymavlink import mavutil
import serial

# Connect to flight controller
master = mavutil.mavlink_connection('/dev/ttyAMA0', baud=57600)

# Connect to HC-12 receiver
tracker = serial.Serial('/dev/ttyUSB0', 9600)

def parse_gps(line):
    """Parse CSV GPS data: GPS,lat,lon,alt"""
    parts = line.strip().split(',')
    if parts[0] == 'GPS':
        return float(parts[1]), float(parts[2]), float(parts[3])
    return None

while True:
    line = tracker.readline().decode('utf-8')
    coords = parse_gps(line)
    
    if coords:
        lat, lon, alt = coords
        print(f"Target: {lat}, {lon}, {alt}m")
        
        # Send waypoint to flight controller
        master.mav.mission_item_send(
            master.target_system,
            master.target_component,
            0,  # seq
            mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT,
            mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,
            2,  # current (2 = guided mode waypoint)
            1,  # autocontinue
            0, 0, 0, 0,  # params 1-4 (unused)
            lat, lon, alt + 10  # +10m altitude offset for safety
        )
```

## 3D Printed Enclosure

I designed a wrist-mounted enclosure in Fusion 360:

![3D model of tracker enclosure](/assets/blog/tracker-enclosure-3d.jpg)

Features:
- Velcro strap mount (fits on wrist or backpack strap)
- LED status indicator cutout (GPS lock, battery level)
- Charging port access (micro-USB)
- Antenna hole for HC-12 module

STL files are on [Thingiverse](https://www.thingiverse.com/) (placeholder link).

## Field Testing Results

I tested the system in an open field with my custom quadcopter (Pixhawk 4 flight controller running ArduPilot).

### Test 1: Stationary Target

- **Distance:** Drone hovered 50m away, I walked in a circle
- **Result:** Drone followed accurately, maintained 10m altitude offset
- **Latency:** ~2 seconds from tracker movement to drone response

### Test 2: Moving Target (Cycling)

- **Speed:** Cycling at ~20 km/h on a bike path
- **Result:** Drone kept up, but struggled with rapid direction changes
- **Issue:** 1Hz GPS update rate is too slow for quick maneuvers

**Solution:** Upgraded to a U-blox NEO-M8N module (10Hz update rate). Much smoother tracking at speed.

### Test 3: Range Test

- **Goal:** Find maximum reliable range
- **Result:** HC-12 maintained connection up to ~800m in open field
- **Limitation:** GPS accuracy degraded beyond 500m (tracker and drone both had consumer GPS)

**Future upgrade:** RTK GPS for centimeter-level accuracy (but costs €200+).

## Lessons Learned

### What Worked Well

- **HC-12 is fantastic** — reliable, long-range, dirt cheap
- **ArduPilot's GUIDED mode is flexible** — accepts waypoints from any source
- **Arduino Nano is perfect for this** — low power, small, easy to program

### Challenges

- **GPS cold start is slow** — takes 30-60 seconds to get a lock
  - **Solution:** Added a small OLED display to show GPS status before takeoff
  
- **Battery life was poor** — 45 minutes with a 1000mAh LiPo
  - **Solution:** Upgraded to a 2500mAh pack, now lasts 2-3 hours

- **The drone sometimes "hunted" around the target**
  - **Cause:** PID tuning for GUIDED mode was too aggressive
  - **Solution:** Reduced waypoint acceptance radius in ArduPilot settings

## Safety Considerations

⚠️ **Important:** This is an experimental system. Always:

- **Maintain visual line of sight** — don't rely solely on follow-me
- **Test in open areas first** — no obstacles, no people
- **Have a safety pilot ready** — someone to take manual control if needed
- **Check local regulations** — autonomous flight may not be legal in your area

## Future Improvements

### 1. Kalman Filtering

GPS position jumps around even when stationary. A Kalman filter would smooth out the noise and predict future positions.

### 2. MAVLink Integration

Currently using a simple CSV format. Proper MAVLink messages would enable:
- Battery level telemetry (know when tracker is low)
- Heartbeat monitoring (detect lost connection)
- Fallback to RTL (Return to Launch) if tracker signal is lost

### 3. Multi-Tracker Support

What if you want the drone to orbit around multiple people? Could track 2-3 beacons and calculate a centroid position.

### 4. Obstacle Avoidance

ArduPilot supports obstacle avoidance with sensors. Could integrate a RealSense camera or lidar for safer autonomous flight.

## Conclusion

Total cost: **€30**. Total build time: **~8 hours** (including 3D printing and testing).

The system works surprisingly well for such a simple design. It's not as polished as DJI's ActiveTrack, but it's universal, hackable, and taught me a ton about GPS, telemetry, and flight controller programming.

If you're into drones and DIY electronics, I highly recommend trying this project. The skills you'll learn (GPS parsing, wireless communication, flight controller integration) transfer to all kinds of other robotics projects.

---

**Parts List:**

- [Arduino Nano](https://store.arduino.cc/products/arduino-nano) (or clone)
- [NEO-M8N GPS module](https://www.u-blox.com/en/product/neo-m8-series) (10Hz update rate)
- [HC-12 wireless module](https://statics3.seeedstudio.com/assets/file/bazaar/product/HC-12_english_datasheets.pdf)
- [2500mAh 2S LiPo battery](https://www.getfpv.com/)

**Software:**

- [ArduPilot](https://ardupilot.org/)
- [MAVLink Protocol](https://mavlink.io/)
- [TinyGPS++ Library](https://github.com/mikalhart/TinyGPSPlus)

**Questions?** Let's talk on [LinkedIn](https://linkedin.com/in/wimstienstra)!
