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
  - Format `` <SECTOR Name>:<OCCURRENCE-CAPACITY>:<HOURLY-CAPACITY>:<Volumes> `` example: `` LECB-CCC:12:LECB-CCU1,LECB-CCU2,LECB-CCL1,LECB-CCL2 ``.
  - HOURLY-CAPACITY: capacity p/h of the sector.
  - OCCURRENCE-CAPACITY: capacity is the "maximum simultaneous acft each minute for each airspace" known as "Occurrance".
  - To "disable" airspaces, it is possible by setting capcity `` 999 ``.

procedures.txt
  - Format ``<AIRPORT>:SID:<letters>:STAR:<letters>`` example: ``LEBL:SID:Q:STAR:W,Z``
    - AIRPORT: ICAO code.
    - letters: last letter of CID, set all the valid letters. Empty if all are valid.
  - The decision of which procedure to choose will be:
    - If pilot filed SID/STAR is in the valid list, then it will selected.
    - If pilot does not file a SID/STAR, the first in the list is chosen (order is by given in letters).
  - If any can be selected, then direct path will be created.

profile_restrictions.txt
  - Format ``<ICAO_DEP>:<ICAO_DEST>:<WPT>:<FL>`` example: ``LPPT,LPFR:*:IMOBA:200``
  - ICAO_DEP: dep airport (or list of airports "," seperated), "*" to select all dep airports (Ex. LPPT,LPCS).
  - ICAO_DEST: dest airport (or list of airports "," seperated), "*" to select all dest airports (Ex. LEBL).
  - WPT: Waypoint to be level at.
  - FL: numeric value indicating the FL (Ex. 200).

  Remark: it will only be respected, if RFL is at or above.
  Remark: This will override SID/STAR ALT restrictions.

  **Please, check already submitted examples before send the request.**
