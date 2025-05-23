/**
 * String prefix in the logger for a sub function, level 1. This is the
 * prefix that appears in front of every log in the console, for graphql
 * functions that are being called inside another one.
 */
const Logger_Prefix_Sub_Level_1 = '--';

const Data_Entry_Query_Amount_Min_Half = 10;
const Data_Entry_Query_Amount_Min_Standard = 20;
const Data_Entry_Query_Amount_Max_Limit = 100;

/**
 * For development testing only, should we use a John Doe placeholder user
 * since we can't log in and have a session token when making queries from
 * localhost:3000?
 */
const Apollo_Server_Context_Auth_Check_Enabled_For_Development = true;

export {
  Logger_Prefix_Sub_Level_1,
  Data_Entry_Query_Amount_Min_Half,
  Data_Entry_Query_Amount_Min_Standard,
  Data_Entry_Query_Amount_Max_Limit,
  Apollo_Server_Context_Auth_Check_Enabled_For_Development,
};
