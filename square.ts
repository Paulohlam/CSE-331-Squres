import { List, nil } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

export function solid(color: Color): Square {
  return {kind: "solid", color: color};
}

export function split(nw: Square, ne: Square, sw: Square, se: Square): Square {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
}


/** Returns JSON describing the given Square. */
export function toJson(sq: Square): any {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
}

/** Converts a JSON description to the Square it describes. */
export function fromJson(data: any): Square {
  if (typeof data === 'string') {
    switch (data) {
      case "white": case "red": case "orange": case "yellow":
      case "green": case "blue": case "purple":
        return solid(data);

      default:
        throw new Error(`unknown color "${data}"`);
    }
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}


/** Indicates one of the four parts of a split. */
export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;

/**
 * gets the foot
 * @param square to be edited
 * @param path to become the next square
 * @returns the root of the given click
 */
export function get(square: Square, path: Path): Square {
  // if no more path then we can return that root
  if (path === nil) {
    return square;
  } else if (square.kind === "solid") {
    throw new Error("Invalid path");
  } else {
    const direction = path.hd;
    switch (direction) {
      case "NW": return get(square.nw, path.tl);
      case "NE": return get(square.ne, path.tl);
      case "SE": return get(square.se, path.tl);
      case "SW": return get(square.sw, path.tl);
    }
  }
}
/**
 * Replaced the current square with the new square
 * @param square is the square that is going to be replaced
 * @param path is the location of the square to be rpelaced 
 * @param square2 is the replacer
 * @returns the old square placed with the new square 
 */
export function replace(square: Square, path: Path, square2: Square): Square {
  if (path === nil) {
    return square2;

  } else if (square.kind === "solid"){
    throw new Error("Invalid path");
  } else {

    const dir = path.hd;
    switch (dir) {
      case "NW":
        return split(replace(square.nw, path.tl, square2),
           square.ne, square.sw, square.se);
      case "NE":
        return split(square.nw, replace(square.ne, path.tl, square2),
           square.sw, square.se);
      case "SE":
        return split(square.nw, square.ne, square.sw,
             replace(square.se, path.tl, square2));
      case "SW":
        return split(square.nw, square.ne,
             replace(square.sw, path.tl, square2), square.se);
    }
  }
}
