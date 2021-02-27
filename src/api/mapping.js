/**
 * @fileoverview
 * This file takes care of mapping the data received from the API to our customs types.
 * Any change brought to any of the models should be reflected here.
 *
 * See the module's definition file (typings/index.d.ts) for more information.
 */

/** @private */
function tryMap(data, mappingFunction, additional) {
  if (!data || (Array.isArray(data) && !data.length)) return undefined;
  const mappedArray = data.map((_data) => mappingFunction(_data, additional));
  return mappedArray.filter((item) => item != null);
}

/** @private */
function mapUser(data) {
  return {
    id: data.id,
    handle: data.handle,
    pictureUrl: data.img_url
  };
}

/** @private */
function mapDimensions(data) {
  return {
    width: data.absoluteBoundingBox.width,
    height: data.absoluteBoundingBox.height
  };
}

/** @private */
function mapBorderRadii(data) {
  return {
    topLeftCorner: data[0],
    topRightCorner: data[1],
    bottomRightCorner: data[2],
    bottomLeftCorner: data[3]
  };
}

/** @private */
function mapColour(data) {
  const keys = ['r', 'g', 'b'].map((key) => Math.round(data[key] * 255));
  const hex = keys
    .map((value) => {
      const hexad = value.toString(16);
      return hexad.length < 2 ? `0${hexad}` : hexad;
    })
    .join('')
    .toUpperCase();

  return {
    r: keys[0],
    g: keys[1],
    b: keys[2],
    a: data.a || 1,
    hex: `#${hex}`
  };
}

/** @private */
function mapEffect(data) {
  return {
    type: data.type,
    radius: data.radius,
    offset: data.offset,
    colour: mapColour(data.color)
  };
}

/** @private */
function mapLayoutGrid(data) {
  return {
    pattern: data.pattern,
    sectionSize: data.sectionSize,
    colour: mapColour(data.colour),
    alignment: data.alignment,
    gutterSize: data.gutterSize,
    offset: data.offset,
    count: data.count
  };
}

/** @private */
function mapColourStop(data) {
  return {
    position: data.position,
    colour: mapColour(data.color)
  };
}

/** @private */
function mapStroke(data, _data) {
  return {
    colour: mapColour(data.color),
    strokeWeight: _data.strokeWeight,
    strokeCap: _data.strokeCap,
    strokeJoin: _data.strokeJoin,
    strokeDashes: _data.strokeDashes,
    strokeMiterAngle: _data.strokeMiterAngle,
    strokeGeometry: _data.strokeGeometry,
    strokeAlign: _data.strokeAlign
  };
}

/** @private */
function mapTextAlign(data) {
  return {
    textAlignHorizontal: data.textAlignHorizontal,
    textAlignVertical: data.textAlignVertical
  };
}

/** @private */
function mapFontStyle(data) {
  return {
    fontFamily: data.fontFamily,
    fontWeight: data.fontWeight,
    fontSize: data.fontSize,
    fontPostScriptName: data.fontPostScriptName
  };
}

/** @private */
function mapLineHeight(data) {
  return {
    lineHeightPx: data.lineHeightPx,
    lineHeightPercent: data.lineHeightPercent,
    lineHeightUnit: data.lineHeightUnit
  };
}

/** @private */
function mapPaint(data) {
  return {
    type: data.type,
    opacity: data.opacity || 1,
    colour: data.type !== 'IMAGE' ? mapColour(data.color) : undefined,
    gradientHandlePositions: data.gradientHandlePositions,
    gradientStops: tryMap(data.gradientStops, mapColourStop),
    imageRef: data.imageRef
  };
}

/** @private */
function mapTextStyle(data) {
  return {
    font: mapFontStyle(data),
    paragraphSpacing: data.paragraphSpacing,
    paragraphIndent: data.paragraphIndent,
    italic: data.italic,
    textCase: data.textCase,
    textDecoration: data.textDecoration,
    textAlign: mapTextAlign(data),
    letterSpacing: data.letterSpacing,
    fills: tryMap(data.fills, mapPaint),
    lineHeight: mapLineHeight(data)
  };
}

/** @private */
function mapFile(data) {
  return {
    key: data.key,
    name: data.name,
    thumbnailUrl: data.thumbnail_url,
    lastModified: data.last_modified
  };
}

/** @private */
function mapStyle(data) {
  return {
    key: data.key,
    fileKey: data.file_key,
    nodeId: data.node_id,
    type: data.style_type,
    name: data.name,
    description: data.description,
    user: mapUser(data.user)
  };
}

/** @private */
function mapNodeProperties(data) {
  return {
    id: data.id,
    name: data.name,
    type: data.type
  };
}

/** @private */
function mapContainerProperties(data) {
  return {
    ...mapNodeProperties(data),
    exportSettings: data.exportSettings,
    opacity: data.opacity,
    dimensions: mapDimensions(data),
    effects: tryMap(data.effects, mapEffect)
  };
}

/** @private */
function mapLayerProperties(data) {
  return {
    ...mapContainerProperties(data),
    fills: tryMap(data.fills, mapPaint),
    fillGeometry: data.fillGeometry,
    strokes: tryMap(data.strokes, mapStroke, data)
  };
}

/** @private */
function mapLayer(data) {
  switch (data.type) {
    case 'FRAME':
    case 'GROUP':
      // eslint-disable-next-line no-use-before-define
      return mapFrameOrGroup(data);

    case 'STAR':
    case 'LINE':
    case 'ELLIPSE':
    case 'REGULAR_POLYGON':
      return mapLayerProperties(data);

    case 'TEXT':
      return {
        ...mapLayerProperties(data),
        value: data.characters,
        style: mapTextStyle(data.style)
      };

    case 'RECTANGLE':
      return {
        ...mapLayerProperties(data),
        borderRadius: data.cornerRadius,
        borderRadii: tryMap(data.rectangleCornerRadii, mapBorderRadii)
      };

    default:
      break;
  }
}

/** @private */
function mapFrameOrGroup(data) {
  return {
    ...mapContainerProperties(data),
    backgroundColour: data.backgroundColour,
    background: tryMap(data.background, mapPaint),
    layoutGrids: tryMap(data.layoutGrid, mapLayoutGrid),
    layers: tryMap(data.children, mapLayer)
  };
}

/** @private */
function mapCanvas(data) {
  const layers = data.children
    .map((child) => {
      if (child.type === 'FRAME' || child.type === 'GROUP') {
        return mapFrameOrGroup(child);
      }
      return undefined;
    })
    .filter((layer) => layer != null);
  return {
    ...mapNodeProperties(data),
    backgroundColour: mapColour(data.backgroundColor),
    exportSettings: data.exportSettings,
    layers
  };
}

function mapStyles(data) {
  return data.map((style) => mapStyle(style));
}

function mapFiles(data) {
  return data.map((file) => mapFile(file));
}

function mapDocument(data) {
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    canvasses: tryMap(data.children, mapCanvas)
  };
}

module.exports = {
  mapDocument,
  mapFiles,
  mapStyles
};
