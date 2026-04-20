---
title: "My First Home Automation Setup"
date: "2026-04-15"
slug: "first-home-automation-setup"
tags: ["home-automation", "iot", "smart-home"]
excerpt: "How I built a custom smart home system using Home Assistant and ESP32 boards"
coverImage: "/assets/blog/home-assistant-dashboard.jpg"
draft: false
---

# Introduction

Building a smart home doesn't require expensive proprietary systems. Here's how I did it with open-source tools and a budget of less than €200.

The goal was simple: create a system that gives me full control over my data, works offline, and can be extended with custom sensors and automations.

## Why Home Assistant?

After researching various platforms, I chose [Home Assistant](https://www.home-assistant.io/) for several reasons:

- **Open source and privacy-focused** — all data stays local
- **Massive device support** — integrates with almost everything
- **Powerful automation engine** — if-then logic with visual editor
- **Active community** — thousands of custom integrations and blueprints

## Hardware Setup

I started with these components:

- **Raspberry Pi 4 (4GB)** — the brain running Home Assistant OS
- **ESP32 development boards** — for custom sensors (€3-5 each)
- **DHT22 temperature/humidity sensors** — accurate and affordable
- **Relay modules** — for controlling lights and appliances
- **Zigbee USB stick** — for Zigbee smart bulbs and switches

![ESP32 sensor setup on breadboard](/assets/blog/esp32-sensor-setup.jpg)

The ESP32 boards are incredibly versatile. I flashed them with [ESPHome](https://esphome.io/), which integrates seamlessly with Home Assistant and allows writing sensor configurations in YAML.

### Example ESPHome Configuration

```yaml
esphome:
  name: living-room-sensor
  platform: ESP32
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Living Room Temperature"
    humidity:
      name: "Living Room Humidity"
    update_interval: 60s

  - platform: wifi_signal
    name: "Living Room Sensor WiFi Signal"
```

This creates two sensors that appear automatically in Home Assistant via the ESPHome integration.

## Software Configuration

Home Assistant's configuration lives in `configuration.yaml`. Here's how I set up MQTT for sensor communication:

```yaml
mqtt:
  broker: 192.168.1.100
  port: 1883
  username: !secret mqtt_username
  password: !secret mqtt_password

sensor:
  - platform: mqtt
    name: "Living Room Temperature"
    state_topic: "home/livingroom/temperature"
    unit_of_measurement: "°C"
    
  - platform: mqtt
    name: "Bedroom Humidity"
    state_topic: "home/bedroom/humidity"
    unit_of_measurement: "%"
```

### Creating Automations

One of my first automations: turn on the bedroom lights gradually before my alarm goes off.

```yaml
automation:
  - alias: "Wake-up Light"
    trigger:
      platform: time
      at: "06:45:00"
    action:
      - service: light.turn_on
        target:
          entity_id: light.bedroom_ceiling
        data:
          brightness_pct: 1
      - delay: "00:00:10"
      - service: light.turn_on
        target:
          entity_id: light.bedroom_ceiling
        data:
          brightness_pct: 100
          transition: 600  # 10 minutes
```

This creates a sunrise simulation effect that gently wakes me up.

![Home Assistant automation dashboard](/assets/blog/home-assistant-dashboard.jpg)

## Cost Breakdown

Here's what I spent:

| Item | Quantity | Price |
|------|----------|-------|
| Raspberry Pi 4 (4GB) | 1 | €55 |
| ESP32 boards | 3 | €12 |
| DHT22 sensors | 3 | €15 |
| Relay modules (4-channel) | 1 | €8 |
| Zigbee USB stick | 1 | €25 |
| Philips Hue bulbs (used) | 4 | €40 |
| Misc (cables, breadboards) | - | €20 |
| **Total** | | **€175** |

## Lessons Learned

### What Went Well

- **ESPHome is magical** — upload firmware wirelessly, sensors just appear in HA
- **Zigbee is reliable** — battery-powered sensors last 1-2 years
- **Community blueprints saved time** — didn't have to write automations from scratch

### Challenges

- **WiFi dead zones** — had to add a mesh extender for basement sensors
- **Device naming** — should have used a consistent naming scheme from the start
- **Power consumption** — Raspberry Pi 4 is overkill; Pi Zero 2 W would work fine

### Future Plans

- Add **presence detection** using room-level Bluetooth beacons
- Integrate **energy monitoring** to track appliance consumption
- Set up **voice control** with a local Whisper instance (no cloud needed)
- Build custom **air quality sensors** with MQ-135 modules

## Conclusion

This setup cost less than €200 and gives me full control over my smart home. No subscriptions, no cloud dependencies, no vendor lock-in.

The best part? It's infinitely extensible. I can add any sensor, any device, any automation I can imagine — all with hardware I can buy locally and software I can inspect and modify.

If you're interested in home automation but hesitant about privacy or cost, I highly recommend starting with Home Assistant and a Raspberry Pi. The learning curve is gentle, and the community is incredibly helpful.

---

**Links:**

- [Home Assistant](https://www.home-assistant.io/)
- [ESPHome](https://esphome.io/)
- [My GitHub repo with configs](https://github.com/WimStienstra) (placeholder)

**Questions?** Reach out on [LinkedIn](https://linkedin.com/in/wimstienstra)!
