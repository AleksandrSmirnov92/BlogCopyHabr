"use strict";
exports.__esModule = true;
require("dotenv").config();
var createClient = require("@supabase/supabase-js").createClient;
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.ANON_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
exports["default"] = supabase;
