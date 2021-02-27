// Type definitions for Voogd Figma Client 1.3.0
// Project: https://github.com/maxzaleski/voogd-figma-client
// Definitions by: Maximilien Zaleski <https://github.com/maxzaleski>

// More in-depth definitions:
// Some types may have been altered in order to make them more readable and relevant to this current project.
// For a more complete set of definitions, please refer to https://www.figma.com/developers/api

declare module 'voogdfigma' {
  export class Client {
    /**
     * @const
     * Your personal Access token.
     */
    readonly personalAccessToken: string;

    constructor(personalAccessToken: string);

    /**
     * Get the document contained within a given file.
     *
     * @param key The file's key.
     */
    getDocument(key: string): Promise<Document>;

    /**
     * Get the document contained within a given file.
     *
     * @param key The file's key.
     * @param callback Function to call on completion/error.
     */
    getDocument(
      key: string,
      callback: (document: Document, err?: Error) => void
    ): void;

    /**
     * Get all the projects for a given team.
     *
     * @param teamId Id of the team to list projects from.
     */
    getProjects(teamId: string): Promise<Project[]>;

    /**
     * Get all the projects for a given team.
     *
     * @param teamId Id of the team to list projects from.
     * @param callback Function to call on completion/error.
     */
    getProjects(
      teamId: string,
      callback: (projects: Project[], err?: Error) => void
    ): void;

    /**
     * Get all the files contained within a given project.
     *
     * @param projectId id of the project to list files from.
     */
    getProjectFiles(projectId: number): Promise<File[]>;

    /**
     * Get all the files contained within a given project.
     *
     * @param projectId id of the project to list files from.
     * @param callback Function to call on completion/error.
     */
    getProjectFiles(
      projectId: number,
      callback: (files: File[], err?: Error) => void
    ): void;

    /**
     * Get all styles stored in the team's library.
     * When provided with a file key,
     * the method will only return the styles which are defined on said file.
     *
     * @param teamId Id of the team to list styles from.
     * @param keys Array of file keys
     */
    getTeamStyles(teamId: string, keys?: string[]): Promise<Style[]>;

    /**
     * Get all styles stored in the team's library.
     * When provided with a file key,
     * the method will only return the styles which are defined on said file.
     *
     * @param teamId Id of the team to list styles from.
     * @param keys Array of file keys
     * @param callback Function to call on response.
     */
    getTeamStyles(
      teamId: string,
      keys?: string[],
      callback?: (styles?: Style[], err?: Error) => void
    ): void;

    /**
     * Exports assets from the document and saves them to local drive.
     *
     * @param key The file's key.
     * @param options Export settings.
     */
    exportAssets(key: string, options: ExportAssetsOptions): Promise<string[]>;

    /**
     * Exports assets from the document and saves them to local drive.
     *
     * @param key The file's key.
     * @param options Export settings.
     * @param callback Function to call on completion/error.
     */
    exportAssets(
      key: string,
      options: ExportAssetsOptions,
      callback?: (err?: Error) => void
    ): void;
  }

  interface Node {
    /**
     * A string uniquely identifying the node within the document.
     */
    id: string;

    /**
     * The name given to the node by the user in the tool.
     */
    name: string;

    /**
     * The type of the node.
     */
    type: NodeType;

    /**
     * Whether or not the node is visible in the tool.
     */
    visible?: boolean;
  }

  interface Container extends Node {
    /**
     * Opacity of the node.
     */
    opacity: number;

    /**
     * Dimensions of the node.
     */
    dimensions: Dimensions;

    /**
     * An array of effects attached to this node.
     */
    effects?: Effect[];

    /**
     * An array of export settings representing images to export from the node.
     */
    exportSettings?: ExportSetting[];
  }

  export interface Document extends Node {
    /**
     * An array of canvases attached to the document.
     */
    canvasses: Canvas[];
  }

  export interface Canvas extends Node {
    /**
     * Background colour of the node.
     */
    backgroundColour: Colour;

    /**
     * An array of top level layers on the node.
     */
    layers?: (Frame | Group)[];

    /**
     * An array of export settings representing images to export from the node.
     */
    exportSettings?: ExportSetting[];
  }

  export interface Frame extends Container {
    /**
     * Background colour of the Frame.
     */
    backgroundColour: Colour;

    /**
     * An array of layers on the node.
     */
    layers?: Layers[];

    /**
     * Background of the node
     */
    background?: Paint[];

    /**
     * An array of layout grids attached to this node.
     */
    layoutGrids?: LayoutGrid[];
  }

  export interface Group extends Frame {}

  export interface Vector extends Node {
    x: number;
    y: number;
  }

  interface Layer extends Container {
    /**
     * An array of fill paints applied to the node.
     */
    fills?: Paint[];

    /**
     * Only specified if parameter geometry=paths is used. An array of paths representing the object fill.
     */
    fillGeometry?: Path[];

    /**
     * An Array of strokes applied to the node.
     */
    strokes?: Stroke[];
  }

  export interface Star extends Layer {}

  export interface Line extends Layer {}

  export interface Ellipse extends Layer {}

  export interface RegularPolygon extends Layer {}

  export interface Rectangle extends Layer {
    /**
     * Radius of each corner of the rectangle if a single radius is set for all corners.
     */
    borderRadius: number;

    /**
     * Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise.
     */
    borderRadii: BorderRadii;
  }

  export interface Text extends Layer {
    /**
     * Style of text including font family.
     */
    style: TextStyle;

    /**
     * Text value of the node as seen in the tool.
     */
    value?: string;
  }

  export interface File {
    /**
     * The key of the file.
     */
    key: string;

    /**
     * The name of the file.
     */
    name: string;

    /**
     * Link to the image used as thumbnail on the file.
     */
    thumbnailUrl: string;

    /**
     * Date and time have last save
     */
    lastModified: string;
  }

  export interface Project {
    /**
     * The id of the project.
     */
    id: number;

    /**
     * The name of the project.
     */
    name: string;
  }

  export interface Path {}

  export interface TextStyle {
    /**
     * Font properties of node.
     */
    font: TextFontProperties;

    /**
     * Vertical and Horizontal alignment applied to the node.
     */
    textAlign: TextAlign;

    /**
     * An array of fill paints applied to the node
     */
    fills: Paint[];

    /**
     * Line height related properties applied to the node.
     */
    lineHeight: TextLineHeight;

    /**
     * Space between paragraphs in px, 0 if not present.
     */
    paragraphSpacing?: number;

    /**
     * Paragraph indentation in px, 0 if not present.
     */
    paragraphIndent?: number;

    /**
     * Whether or not text is italicised.
     */
    italic?: boolean;

    /**
     * Text casing applied to the node, default is the original casing.
     */
    textCase?: TextCase;

    /**
     * Text decoration applied to the node, default is none.
     */
    textDecoration?: TextDecoration;

    /**
     * Space between characters in px.
     */
    letterSpacing?: number;
  }

  export interface TextFontProperties {
    /**
     * Font family of text (standard name).
     */
    fontFamily: string;

    /**
     * Numeric font weight.
     */
    fontWeight: number;

    /**
     * Font size in px.
     */
    fontSize: number;

    /**
     * PostScript font name.
     */
    fontPostScriptName?: string;
  }

  export interface TextAlign {
    /**
     * Horizontal text alignment.
     */
    textAlignHorizontal: TextAlignHorizontal;

    /**
     * Vertical text alignment.
     */
    textAlignVertical: TextAlignVertical;
  }

  export interface TextLineHeight {
    /**
     * Line height in px.
     */
    lineHeightPx: number;

    /**
     * @deprecated
     * Might be returned in a later version.
     */
    lineHeightPercent: number;

    /**
     * The unit of the line height value specified by the user.
     */
    lineHeightUnit: string;
  }

  export interface Colour {
    /**
     * Red value.
     */
    r: number;

    /**
     * Green value.
     */
    g: number;

    /**
     * Blue value
     */
    b: number;

    /**
     * Alpha (opacity) value.
     */
    a: number;

    /**
     * Get the colour value has a hexadecimal.
     */
    hex: string;
  }

  export interface Stroke {
    /**
     * An array of fill paints applied to the node.
     */
    colour: Colour;

    /**
     * The weight of strokes on the node.
     */
    strokeWeight: number;

    /**
     * The end caps of vector paths.
     */
    strokeCap: StrokeCap;

    /**
     * How corners in vector paths are rendered.
     */
    strokeJoin: StrokeJoin;

    /**
     * An array of floating point numbers describing the pattern of dash length and gap lengths that the vector path follows.
     * For example a value of [1, 2] indicates that the path has a dash of length 1 followed by a gap of length 2, repeated.
     */
    strokeDashes: number[];

    /**
     * Only valid if strokeJoin is "MITER".
     * The corner angle, in degrees, below which strokeJoin will be set to "BEVEL" to avoid super sharp corners.
     * By default this is 28.96 degrees.
     */
    strokeMiterAngle: number;

    /**
     * Only specified if parameter geometry=paths is used. An array of paths representing the object stroke.
     */
    strokeGeometry: Path[];

    /**
     * Where stroke is drawn relative to the vector outline.
     */
    strokeAlign: StrokeAlign;
  }

  export interface Dimensions {
    /**
     * Width of the node.
     */
    width: number;

    /**
     * Height of the node.
     */
    height: number;
  }

  export interface ExportSetting {
    /**
     * File suffix to append to all filenames.
     */
    suffix: string;

    /**
     * Image format.
     */
    format: ImageFormat;

    /**
     * Constraint that determines sizing of exported asset.
     */
    constraint: Constraint;
  }

  export interface LayoutGrid {
    /**
     * Orientation of the grid.
     */
    pattern: LayoutGridPattern;

    /**
     * Width of column grid or height of row grid or square grid spacing.
     */
    sectionSize: number;

    /**
     * Colour of the grid.
     */
    colour: Colour;

    /**
     * Positioning of grid.
     */
    alignment: LayoutGridAlignment;

    /**
     * Spacing in between columns and rows.
     */
    gutterSize: number;

    /**
     * Spacing before the first column or row.
     */
    offset: number;

    /**
     * Number of columns or rows.
     */
    count: number;
  }

  export interface Effect {
    /**
     * Type of effect.
     */
    type: EffectType;

    /**
     * Radius of the blur effect (applies to shadows as well).
     */
    radius: number;

    /**
     * Colour of the shadow.
     */
    colour?: Colour;

    /**
     * How far the shadow is projected in the x and y directions.
     */
    offset?: Vector;
  }

  export interface Rgba {
    /**
     * Red value.
     */
    r: number;

    /**
     * Green value.
     */
    g: number;

    /**
     * Blue value.
     */
    b: number;

    /**
     * Alpha (opacity) value.
     */
    a: number;
  }

  export interface Paint {
    /**
     * Type of paint.
     */
    type: PaintType;

    /**
     * Overall opacity of paint (colours within the paint can also have opacity values which would blend with this)
     */
    opacity: number;

    /**
     * Solid colour of the paint.
     */
    colour?: Colour;

    /**
     * This field contains three vectors, each of which are a position in normalized object space
     * (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)).
     * The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops),
     * the second position is the end of the gradient (value 1),
     * and the third handle position determines the width of the gradient.
     */
    gradientHandlePositions?: Vector[];

    /**
     * Positions of key points along the gradient axis with the colours anchored there.
     *
     * Colours along the gradient are interpolated smoothly between neighboring gradient stops.
     */
    gradientStops?: ColourStop[];

    /**
     * A reference to an image embedded in the file.
     *
     * To download the image using this reference,
     * use the getImages method in Client to retrieve the mapping from image references to image URLs.
     */
    imageRef?: string;
  }

  export interface ColourStop {
    /**
     * Value between 0 and 1 representing position along gradient axis.
     */
    position: number;

    /**
     * Colour attached to corresponding position.
     */
    colour: Colour;
  }

  export interface Constraint {
    /**
     * Type of constraint to apply.
     */
    type: ConstraintType;

    /**
     * The set value
     */
    value: number;
  }

  export interface BorderRadii {
    /**
     * The top left corner radius for the node.
     */
    topLeftCorner: number;

    /**
     * The top right corner radius for the node.
     */
    topRightCorner: number;

    /**
     * The bottom left corner radius for the node.
     */
    bottomLeftCorner: number;

    /**
     * The bottom right corner radius for the node.
     */
    bottomRightCorner: number;
  }

  export interface ExportAssetsOptions {
    /**
     * Assets.
     */
    assetRefs: AssetRef[];

    /**
     * Directory where the assets should be saved.
     *
     * @default
     * "root/exported_assets"
     */
    outDir?: string;

    /**
     * File format.
     */
    format?: ImageFormat;
  }

  export interface AssetRef {
    /**
     * Node ID.
     */
    id: string;

    /**
     * Name the asset will hold on local disk.
     */
    exportAs: string;
  }

  export interface Asset {
    /**
     * Name to be saved as.
     */
    exportAs: string;

    /**
     * Link to asset.
     */
    url: string;
  }

  export interface Style {
    /**
     * The unique identifier of the style.
     */
    key: string;

    /**
     * The unique identifier of the file which contains the style.
     */
    fileKey: string;

    /**
     * Id of the style node within the figma file.
     */
    nodeId: string;

    /**
     * The type of style.
     */
    type: StyleType;

    /**
     * Name of the style.
     */
    name: string;

    /**
     * The description of the style as entered by the publisher.
     */
    description: string;

    /**
     * The user who last updated the style. Most likely its publisher.
     */
    user: User;
  }

  export interface User {
    /**
     * Unique stable id of the user.
     */
    id: string;

    /**
     * Name of the user.
     */
    handle: string;

    /**
     * URL link to the user's profile image.
     */
    pictureUrl: string;
  }

  export enum NodeType {
    DOCUMENT = 'DOCUMENT',
    CANVAS = 'CANVAS',
    FRAME = 'FRAME',
    GROUP = 'GROUP',
    LAYER = 'LAYER',
    STAR = 'STAR',
    LINE = 'LINE',
    ELLIPSE = 'ELLIPSE',
    REGULAR_POLYGON = 'REGULAR_POLYGON',
    RECTANGLE = 'RECTANGLE',
    TEXT = 'TEXT',
    SLICE = 'SLICE',
  }

  export enum ImageFormat {
    PNG = 'PNG',
    JPG = 'JPG',
    SVG = 'SVG',
  }

  export enum ConstraintType {
    SCALE = 'SCALE',
    WIDTH = 'WIDTH',
    HEIGHT = 'HEIGHT',
  }

  export enum LayoutGridPattern {
    COLUMNS = 'COLUMNS',
    ROWS = 'ROWS',
    GRID = 'GRID',
  }

  export enum LayoutGridAlignment {
    MIN = 'MIN',
    STRETCH = 'STRETCH',
    CENTER = 'CENTER',
  }

  export enum EffectType {
    INNER_SHADOW = 'INNER_SHADOW',
    DROP_SHADOW = 'DROP_SHADOW',
    LAYER_BLUR = 'LAYER_BLUR',
    BACKGROUND_BLUR = 'BACKGROUND_BLUR',
  }

  export enum PaintType {
    SOLID = 'SOLID',
    GRADIENT_LINEAR = 'GRADIENT_LINEAR',
    GRADIENT_RADIAL = 'GRADIENT_RADIAL',
    GRADIENT_ANGULAR = 'GRADIENT_ANGULAR',
    GRADIENT_DIAMOND = 'GRADIENT_DIAMOND',
    IMAGE = 'IMAGE',
    EMOJI = 'EMOJI',
  }

  export enum StrokeCap {
    NONE = 'NONE',
    ROUND = 'ROUND',
    SQUARE = 'SQUARE',
    LINE_ARROW = 'LINE_ARROW',
    TRIANGLE_ARROW = 'TRIANGLE_ARROW',
  }

  export enum StrokeJoin {
    MITER = 'MITER',
    BEVEL = 'BEVEL',
    ROUND = 'ROUND',
  }

  export enum StrokeAlign {
    INSIDE = 'INSIDE',
    OUTSIDE = 'OUTSIDE',
    CENTER = 'CENTER',
  }

  export enum TextCase {
    UPPER = 'UPPER',
    LOWER = 'LOWER',
    TITLE = 'TITLE',
  }

  export enum TextDecoration {
    STRIKETHROUGH = 'STRIKETHROUGH',
    UNDERLINE = 'UNDERLINE',
  }

  export enum TextAlignHorizontal {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    CENTER = 'CENTER',
    JUSTIFIED = 'JUSTIFIED',
  }

  export enum TextAlignVertical {
    TOP = 'TOP',
    CENTER = 'CENTER',
    BOTTOM = 'BOTTOM',
  }

  export enum StyleType {
    FILL = 'FILL',
    EFFECT = 'EFFECT',
    TEXT = 'TEXT',
  }

  export type Layers =
    | Rectangle
    | Text
    | Star
    | Line
    | Ellipse
    | RegularPolygon;
}
