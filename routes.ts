import { Request, Response } from "express";

const fileMap = new Map<string, string>();

/** Returns a list of all the named save files. */
export function Dummy(req: Request, res: Response) {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(500).send('missing "name" parameter');
  } else {
    res.json(`Hi, ${name}`);
  }
}

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}

/**
 * Saves the given name and content for the request and reponse
 * @param req objs for name and content
 * @param res obj will store the name and content
 */
export function Save(req: Request, res: Response) {
  const name = first(req.query.name);
  const content = first(req.body.content);

  // check name
  if (name === undefined) {
    res.status(500).send('missing "name" parameter');
    return;
  }

  // check content
  if (content === undefined) {
    res.status(500).send('missing "content" parameter');
    return;
  }

  fileMap.set(name, content);
  res.json(`Saved file, ${name}`);
}

/**
 * Loads previously saved content using given file name
 * @param req obj to load previous file
 * @param res obj will store content of file
 */
export function Load(req: Request, res: Response) {
  const fileName = first(req.query.name);

  if (fileName === undefined) {
    res.status(500).send('missing "name" parameter');
    return;
  }

  const content = fileMap.get(fileName);

  if (content === undefined) {
    res.status(404).send('file not found');
    return;
  }
  res.json(content);
}

/**
 * List names that are currently saved
 */
export function List(_: Request, res: Response) {
  const list : string[] = [];

  for (const item of fileMap.keys()) {
    list.push(item);
  }

  res.json(list);
}

/**
 * Remove file saved during test run
 */
export function Reset() {
  fileMap.clear();
}
