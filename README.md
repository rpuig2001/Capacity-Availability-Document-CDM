# CAD - Capacity Availability Document for the CDM Plugin

More information about the CDM can be found on the [CDM WEBSITE](https://vats.im/cdm)

<br>

# How Do I Submit My Request?

Create an Issue with your .txt file URL.

<br>

# Which Is The Format?
CAD.txt:
  - Format `` [ICAO AIRPORT],[RATE/H] `` ex. `` LEPA,33 ``.
  - Each line has an airport with it's value.
  - It is possible to create groups of airports with a wildcard on the last 2 digits of the ICAO. ex. (All Germany) -> `` ED**,10 ``.
  - Use `` # `` as the first character for a comment.
  - Avoid empty lines.

volumes.geojson:
  - Here volumes are included to later use them as sectors. To pass the vatglasses data into the required form, it is possible by using this converter: [VATGLASSES-CDM-CONVERTER](https://cdm.vatsimspain.es/vatglasses-to-cdm)
  - As SIDs and STARs are not considered, therefore, for better planning sectors should not be defined below at FL145 (If sectors are around departure/arrival ariports) and/or APP sectors not recommended to be included.
  - MinFL, MaxFL and capacity are a must to have correctly defined airspaces.
  - Lateral limits should be defined as Multipolygon (Like Vatspy data).
  - To check data by vertical limits, the following website is created (Data from the main branch is used): [AIRSPACES-MAP](https://cdm.vatsimspain.es/airspaces-map.html)
sectors.txt
  - Format `` <SECTOR Name>:<CAPACITY>:<Volumes> `` example: `` LECB-CCC:12:LECB-CCU1,LECB-CCU2,LECB-CCL1,LECB-CCL2 ``.
  -  Capacity: capacity is the "maximum simultaneous acft for each airspace" known as "Peak". If we don't have this information we can do: ( `` max acft per hour `` x `` average airspace time `` ) / `` 60 ``.
    - Example: max capacity 30 p/h, average airspace time 15min (meaning aircrafts stay an average of 15min in the airspace): (30x15)/60 = 7.
  - To "disable" airspaces, it is possible by setting capcity `` 999 ``.

  
  **Please, check examples already submitted before send the request.**
