"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require("@supabase/supabase-js"),
    createClient = _require.createClient;

var supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
var supabaseKey = process.env.REACT_APP_ANON_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
var _default = supabase;
exports["default"] = _default;