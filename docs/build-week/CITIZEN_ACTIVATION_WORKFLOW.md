# Citizen Activation Workflow

## Purpose

The Build Week route now starts with a product-facing simulation of how a person could activate PIPO from a device.
It is a conceptual demonstration only. It does not install a native application, contact emergency services, collect
personal data, or activate real device capabilities.

## Projected native access

PIPO is projected as a downloadable application for immediate activation. On compatible Android devices, a person
could authorize a floating access point. Other operating systems may offer an equivalent through a widget, lock-screen
surface, system control, shortcut, or action button. The final availability depends on the operating system, device
capabilities, and permissions that the person explicitly grants.

The demonstration intentionally does not claim that a universal floating point works on every system.

## Demonstration flow

1. A fictional messaging screen displays a visible PIPO access point.
2. The person opens the access point and chooses an emergency condition.
3. The person individually selects simulated location, audio, video, written description, and fictional device
   information for this simulated incident.
4. The person can cancel or explicitly start the simulated alert.
5. The screen shows abstract simulated video, audio, location, a timer, an incident identifier, routing, and a
   receiving operator.
6. The institutional reception card receives the same simulated context before the field stage.
7. The route visualizes citizen, master console, competent agency, field operator, act and record, and citizen closure.

## Permissions and control

No permission is selected by default. Each simulated permission can be changed independently, and stopping audio,
video, or location changes only the in-memory state of the demonstration. Ending a session creates a new simulation
state without saving an incident, media, statement, evidence, or permission history in browser storage.

## AI boundary

AI does not activate sensors. The person starts the session and explicitly selects what simulated information to
share. Operational decisions remain under human control. The simulated AI assistant cannot start media, track a
device, dispatch resources, authorize invasive measures, or close an incident.

## Demonstration ledger

The citizen activation view keeps an in-memory append-only demonstration ledger. Each new event includes the previous
reference and a demonstration integrity reference. It is not an official evidentiary chain of custody and it never
contains real media.
