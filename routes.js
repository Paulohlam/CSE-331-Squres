"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset = exports.List = exports.Load = exports.Save = exports.Dummy = void 0;
var fileMap = new Map();
/** Returns a list of all the named save files. */
function Dummy(req, res) {
    var name = first(req.query.name);
    if (name === undefined) {
        res.status(500).send('missing "name" parameter');
    }
    else {
        res.json("Hi, ".concat(name));
    }
}
exports.Dummy = Dummy;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param) {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
}
/**
 * Saves the given name and content for the request and reponse
 * @param req objs for name and content
 * @param res obj will store the name and content
 */
function Save(req, res) {
    var name = first(req.query.name);
    var content = first(req.body.content);
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
    res.json("Saved file, ".concat(name));
}
exports.Save = Save;
/**
 * Loads previously saved content using given file name
 * @param req obj to load previous file
 * @param res obj will store content of file
 */
function Load(req, res) {
    var fileName = first(req.query.name);
    if (fileName === undefined) {
        res.status(500).send('missing "name" parameter');
        return;
    }
    var content = fileMap.get(fileName);
    if (content === undefined) {
        res.status(404).send('file not found');
        return;
    }
    res.json(content);
}
exports.Load = Load;
/**
 * List names that are currently saved
 */
function List(_, res) {
    var e_1, _a;
    var list = [];
    try {
        for (var _b = __values(fileMap.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var item = _c.value;
            list.push(item);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.json(list);
}
exports.List = List;
/**
 * Remove file saved during test run
 */
function Reset() {
    fileMap.clear();
}
exports.Reset = Reset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0FBRTFDLGtEQUFrRDtBQUNsRCxTQUFnQixLQUFLLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDL0MsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBTyxJQUFJLENBQUUsQ0FBQyxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQztBQVBELHNCQU9DO0FBRUQsd0VBQXdFO0FBQ3hFLDRFQUE0RTtBQUM1RSxtREFBbUQ7QUFDbkQsU0FBUyxLQUFLLENBQUMsS0FBVTtJQUN2QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzlDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhDLGFBQWE7SUFDYixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDcEQsT0FBTztLQUNSO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBZSxJQUFJLENBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFsQkQsb0JBa0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLElBQUksQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUM5QyxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV2QyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7SUFFRCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXRDLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU87S0FDUjtJQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQWZELG9CQWVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixJQUFJLENBQUMsQ0FBVSxFQUFFLEdBQWE7O0lBQzVDLElBQU0sSUFBSSxHQUFjLEVBQUUsQ0FBQzs7UUFFM0IsS0FBbUIsSUFBQSxLQUFBLFNBQUEsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBLGdCQUFBLDRCQUFFO1lBQTlCLElBQU0sSUFBSSxXQUFBO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjs7Ozs7Ozs7O0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBUkQsb0JBUUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLEtBQUs7SUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2xCLENBQUM7QUFGRCxzQkFFQyJ9