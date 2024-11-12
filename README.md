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

airspaces.geojson:
  - Exceptions:
    - In case it is required to add volumes with the same name to consider the same sector. It is possible by using airspaceID followed by a ``/`` -> `` name/1 name/2 name/3``.
  - To disable airspaces, it is possible by setting capcity `` 999 ``.
  - MinFL, MaxFL and capacity are a must to have correctly defined airspaces.
  - Lateral limits should be defined as Multipolygon (Like Vatspy data).
  - To check data by vertical limits, the following website is created (Data from the main branch is used): url tbd

  
  **Please, check examples already submitted before send the request.**
