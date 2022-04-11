import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { ExifData } from '../pages/api/exif/[id]';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

type MapProps = {
  coordinates?: [number, number];
};

const convert_array_to_degress = ([d, m, s]: [
  number,
  number,
  number
]): number => {
  return d + m / 60.0 + s / 3600.0;
};

export const exifCoordsToMapCoords = (exifData: ExifData): [number, number] => {
  let lat = convert_array_to_degress(exifData.exif.gps.GPSLatitude);
  let lon = convert_array_to_degress(exifData.exif.gps.GPSLongitude);
  if (exifData.exif.gps.GPSLatitudeRef === 'S') {
    lat = 0 - lat;
  }
  if (exifData.exif.gps.GPSLongitudeRef === 'W') {
    lon = 0 - lon;
  }
  lon = parseFloat(lon.toFixed(4));
  lat = parseFloat(lat.toFixed(4));

  return [lon, lat];
};

const MapChart = (props: MapProps) => {
  return (
    <>
      <ComposableMap
        width={100}
        height={100}
        projection="geoEqualEarth"
        projectionConfig={{
          // rotate: [58, 20, 0],
          scale: 400,
          center: props ? props.coordinates : [0, 0],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              // .filter((d) => d.properties.REGION_UN === 'Americas')
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
          }
        </Geographies>
        {props.coordinates ? (
          <Marker key={'test'} coordinates={props.coordinates}>
            <circle r={5} fill="#000" stroke="#fff" strokeWidth={1} />
          </Marker>
        ) : null}
      </ComposableMap>
    </>
  );
};

export default MapChart;
