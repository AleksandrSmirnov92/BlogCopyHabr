"use strict";
exports.__esModule = true;
exports.supabase = void 0;
require("dotenv").config();
var createClient = require("@supabase/supabase-js").createClient;
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.ANON_KEY;
exports.supabase = createClient(supabaseUrl, supabaseKey);
