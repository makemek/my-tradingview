// Taken from https://www.tradingview.com/static/bundles/protobuf-handler.5b6439fd51e008c746a0.js
export default {
  package: null,
  syntax: 'proto2',
  messages: [
    {
      name: 'Msg',
      syntax: 'proto2',
      fields: [
        {
          rule: 'optional',
          type: 'Commands',
          name: 'command_number',
          id: 1,
        },
        { rule: 'optional', type: 'bytes', name: 'data', id: 2 },
        { rule: 'optional', type: 'int32', name: 'time', id: 3 },
      ],
      enums: [
        {
          name: 'Commands',
          syntax: 'proto2',
          values: [
            { name: 'chart_create_session', id: 0 },
            { name: 'chart_delete_session', id: 1 },
            { name: 'resolve_symbol', id: 2 },
            { name: 'create_series', id: 3 },
            { name: 'create_study', id: 4 },
            { name: 'message', id: 5 },
            { name: 'timescale_update', id: 6 },
            { name: 'du', id: 7 },
            { name: 'series_loading', id: 8 },
            { name: 'series_completed', id: 9 },
            { name: 'series_error', id: 10 },
            { name: 'series_deleted', id: 11 },
            { name: 'series_timeframe', id: 12 },
            { name: 'first_bar_time', id: 13 },
            { name: 'study_loading', id: 14 },
            { name: 'study_completed', id: 15 },
            { name: 'switch_timezone', id: 16 },
            { name: 'request_studies_metadata', id: 17 },
            { name: 'remove_series', id: 18 },
            { name: 'modify_series', id: 19 },
            { name: 'request_more_data', id: 20 },
            { name: 'get_first_bar_time', id: 21 },
            { name: 'create_child_study', id: 22 },
            { name: 'remove_study', id: 23 },
            { name: 'modify_study', id: 24 },
            { name: 'create_pointset', id: 25 },
            { name: 'symbol_resolved', id: 26 },
            { name: 'study_deleted', id: 27 },
            { name: 'protocol_error', id: 28 },
            { name: 'critical_error', id: 29 },
            { name: 'set_auth_token', id: 30 },
            { name: 'studies_metadata', id: 31 },
            { name: 'set_data_quality', id: 32 },
            { name: 'quote_create_session', id: 33 },
            { name: 'quote_set_fields', id: 34 },
            { name: 'quote_delete_session', id: 35 },
            { name: 'quote_add_symbols', id: 36 },
            { name: 'quote_remove_symbols', id: 37 },
            { name: 'quote_switch_timezone', id: 38 },
            { name: 'quote_fast_symbols', id: 39 },
            { name: 'quote_hibernate_all', id: 40 },
            { name: 'qsd', id: 41 },
            { name: 'quote_list_fields', id: 42 },
            { name: 'depth_create_session', id: 43 },
            { name: 'depth_delete_session', id: 44 },
            { name: 'depth_set_symbol', id: 45 },
            { name: 'depth_clear_symbol', id: 46 },
            { name: 'depth_set_scale', id: 47 },
            { name: 'depth_symbol_success', id: 48 },
            { name: 'depth_symbol_error', id: 49 },
            { name: 'depth_symbol_cleared', id: 50 },
            { name: 'dd', id: 51 },
            { name: 'depth_bar_last_value', id: 52 },
            { name: 'remove_pointset', id: 53 },
            { name: 'study_error', id: 54 },
            { name: 'modify_pointset', id: 55 },
            { name: 'switch_protocol', id: 56 },
            { name: 'symbol_error', id: 57 },
            { name: 'request_more_tickmarks', id: 58 },
            { name: 'tickmark_update', id: 59 },
            { name: 'error_message', id: 60 },
            { name: 'wrong_message_type', id: 61 },
            { name: 'mock_fire_tick', id: 62 },
            { name: 'pointset_error', id: 63 },
            { name: 'quote_fire_tick', id: 64 },
            { name: 'quote_fire_crash', id: 65 },
            { name: 'child_study_rebind', id: 66 },
            { name: 'replay_point', id: 67 },
            { name: 'replay_create_session', id: 68 },
            { name: 'replay_delete_session', id: 69 },
            { name: 'replay_add_series', id: 70 },
            { name: 'replay_remove_series', id: 71 },
            { name: 'replay_reset', id: 72 },
            { name: 'replay_step', id: 73 },
            { name: 'replay_error', id: 74 },
            { name: 'replay_ok', id: 75 },
            { name: 'replay_start', id: 76 },
            { name: 'replay_stop', id: 77 },
            { name: 'replay_resolutions', id: 78 },
            { name: 'replay_data_end', id: 79 },
            { name: 'replay_set_resolution', id: 80 },
            { name: 'protocol_switched', id: 81 },
            { name: 'replay_instance_id', id: 82 },
            { name: 'unsupported_resolution', id: 83 },
            { name: 'quote_completed', id: 84 },
          ],
        },
      ],
    },
    {
      name: 'chart_create_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'parameters',
          id: 2,
        },
      ],
    },
    {
      name: 'chart_delete_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'switch_timezone',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'timezone', id: 2 },
      ],
    },
    {
      name: 'request_studies_metadata',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'meta_name',
          id: 2,
        },
      ],
    },
    {
      name: 'resolve_symbol',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolve_name',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'symbol', id: 3 },
      ],
    },
    {
      name: 'symbol_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
        { rule: 'repeated', type: 'string', name: 'reason', id: 3 },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'create_series',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolve_name',
          id: 4,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 5,
        },
        { rule: 'optional', type: 'string', name: 'bars', id: 6 },
      ],
    },
    {
      name: 'remove_series',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
      ],
    },
    {
      name: 'modify_series',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolve_name',
          id: 4,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 5,
        },
      ],
    },
    {
      name: 'request_more_data',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        { rule: 'optional', type: 'int32', name: 'count', id: 3 },
      ],
    },
    {
      name: 'get_first_bar_time',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 3,
        },
      ],
    },
    {
      name: 'create_study',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'parent', id: 4 },
        { rule: 'optional', type: 'string', name: 'study', id: 5 },
        { rule: 'optional', type: 'bytes', name: 'inputs', id: 6 },
      ],
    },
    {
      name: 'create_child_study',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'parent', id: 4 },
        { rule: 'optional', type: 'string', name: 'study', id: 5 },
        { rule: 'optional', type: 'bytes', name: 'inputs', id: 6 },
      ],
    },
    {
      name: 'child_study_rebind',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'parent', id: 4 },
        { rule: 'optional', type: 'string', name: 'study', id: 5 },
        { rule: 'optional', type: 'bytes', name: 'inputs', id: 6 },
      ],
    },
    {
      name: 'remove_study',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
      ],
    },
    {
      name: 'modify_study',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'bytes', name: 'inputs', id: 4 },
      ],
    },
    {
      name: 'create_pointset',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'ps_name', id: 2 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'symbol', id: 4 },
        { rule: 'optional', type: 'string', name: 'interval', id: 5 },
        { rule: 'optional', type: 'string', name: 'points', id: 6 },
      ],
    },
    {
      name: 'modify_pointset',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'ps_name', id: 2 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'points', id: 4 },
      ],
    },
    {
      name: 'remove_pointset',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'ps_name', id: 2 },
      ],
    },
    {
      name: 'quote_create_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'quote_set_fields',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'fields', id: 2 },
      ],
    },
    {
      name: 'quote_delete_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'quote_add_symbols',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbols', id: 2 },
      ],
    },
    {
      name: 'quote_remove_symbols',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'repeated', type: 'string', name: 'symbols', id: 2 },
      ],
    },
    {
      name: 'quote_switch_timezone',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'timezone', id: 2 },
      ],
    },
    {
      name: 'quote_fast_symbols',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbols', id: 2 },
      ],
    },
    {
      name: 'quote_hibernate_all',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'quote_fire_tick',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
      ],
    },
    {
      name: 'quote_fire_crash',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
      ],
    },
    {
      name: 'depth_create_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'double',
          name: 'multiplier',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'int32',
          name: 'viewport_width',
          id: 3,
        },
      ],
    },
    {
      name: 'depth_delete_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'depth_set_symbol',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
      ],
    },
    {
      name: 'depth_clear_symbol',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'depth_set_scale',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'double', name: 'scale', id: 2 },
      ],
    },
    {
      name: 'replay_create_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'replay_delete_session',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'replay_add_series',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'symbol', id: 3 },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 4,
        },
      ],
    },
    {
      name: 'replay_remove_series',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'symbol', id: 3 },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 4,
        },
      ],
    },
    {
      name: 'replay_reset',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 3 },
      ],
    },
    {
      name: 'replay_step',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'int32', name: 'length', id: 3 },
      ],
    },
    {
      name: 'replay_start',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'int32', name: 'delay', id: 3 },
      ],
    },
    {
      name: 'replay_stop',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
      ],
    },
    {
      name: 'replay_set_resolution',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 3,
        },
      ],
    },
    {
      name: 'set_auth_token',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'token', id: 1 },
      ],
    },
    {
      name: 'set_data_quality',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'quality', id: 1 },
      ],
    },
    {
      name: 'request_more_tickmarks',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        { rule: 'optional', type: 'int32', name: 'bars', id: 3 },
      ],
    },
    {
      name: 'switch_protocol',
      syntax: 'proto2',
      fields: [
        {
          rule: 'optional',
          type: 'DataType',
          name: 'protocol',
          id: 1,
        },
      ],
      enums: [
        {
          name: 'DataType',
          syntax: 'proto2',
          values: [
            { name: 'json', id: 0 },
            { name: 'protobuf', id: 1 },
          ],
        },
      ],
    },
    {
      name: 'protocol_switched',
      syntax: 'proto2',
      fields: [
        {
          rule: 'optional',
          type: 'DataType',
          name: 'protocol',
          id: 1,
        },
      ],
      enums: [
        {
          name: 'DataType',
          syntax: 'proto2',
          values: [
            { name: 'json', id: 0 },
            { name: 'protobuf', id: 1 },
          ],
        },
      ],
    },
    {
      name: 'mock_fire_tick',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
        { rule: 'optional', type: 'double', name: 'time', id: 3 },
        { rule: 'optional', type: 'double', name: 'price', id: 4 },
        { rule: 'optional', type: 'double', name: 'size', id: 5 },
      ],
    },
    {
      name: 'message',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'text', id: 1 },
      ],
    },
    {
      name: 'protocol_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'text', id: 1 },
      ],
    },
    {
      name: 'critical_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'reason', id: 2 },
        { rule: 'optional', type: 'string', name: 'info', id: 3 },
      ],
    },
    {
      name: 'error_message',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'params', id: 2 },
      ],
    },
    {
      name: 'wrong_message_type',
      syntax: 'proto2',
      fields: [
        {
          rule: 'optional',
          type: 'string',
          name: 'fail_message',
          id: 1,
        },
      ],
    },
    {
      name: 'series_loading',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'series_completed',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'update_mode',
          id: 3,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 4,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 5 },
      ],
    },
    {
      name: 'series_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'reason', id: 4 },
        { rule: 'optional', type: 'string', name: 'node', id: 5 },
        { rule: 'optional', type: 'int32', name: 'time', id: 6 },
      ],
    },
    {
      name: 'series_deleted',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'series_timeframe',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'left', id: 4 },
        { rule: 'optional', type: 'int32', name: 'right', id: 5 },
      ],
    },
    {
      name: 'first_bar_time',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_id',
          id: 2,
        },
        { rule: 'optional', type: 'double', name: 'time', id: 3 },
      ],
    },
    {
      name: 'unsupported_resolution',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'object_id',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'resolution',
          id: 4,
        },
      ],
    },
    {
      name: 'study_loading',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'study_completed',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 4,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 5 },
      ],
    },
    {
      name: 'study_deleted',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'study_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'study_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
        { rule: 'optional', type: 'string', name: 'reason', id: 4 },
        { rule: 'optional', type: 'string', name: 'node', id: 5 },
        { rule: 'optional', type: 'int32', name: 'time', id: 6 },
      ],
    },
    {
      name: 'timescale_update',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'timescale',
          name: 'timescale',
          id: 2,
        },
        { rule: 'optional', type: 'objects', name: 'objects', id: 3 },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'du',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'objects', name: 'objects', id: 2 },
      ],
    },
    {
      name: 'timescale',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'int32', name: 'index', id: 1 },
        { rule: 'optional', type: 'int32', name: 'zoffset', id: 2 },
        { rule: 'repeated', type: 'double', name: 'changes', id: 3 },
        { rule: 'repeated', type: 'marks', name: 'marks', id: 4 },
        {
          rule: 'repeated',
          type: 'index_diff',
          name: 'index_diff',
          id: 5,
        },
      ],
    },
    {
      name: 'tickmark_update',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'int32', name: 'index', id: 2 },
        { rule: 'optional', type: 'int32', name: 'zoffset', id: 3 },
        { rule: 'repeated', type: 'double', name: 'changes', id: 4 },
        { rule: 'repeated', type: 'marks', name: 'marks', id: 5 },
      ],
    },
    {
      name: 'marks',
      syntax: 'proto2',
      fields: [
        { rule: 'repeated', type: 'double', name: 'value', id: 1 },
      ],
    },
    {
      name: 'index_diff',
      syntax: 'proto2',
      fields: [
        { rule: 'repeated', type: 'int32', name: 'index', id: 1 },
      ],
    },
    {
      name: 'objects',
      syntax: 'proto2',
      fields: [
        { rule: 'repeated', type: 'series', name: 'series', id: 1 },
      ],
    },
    {
      name: 'series',
      syntax: 'proto2',
      fields: [
        {
          rule: 'optional',
          type: 'string',
          name: 'series_name',
          id: 1,
        },
        { rule: 'optional', type: 'string', name: 'node', id: 2 },
        { rule: 'repeated', type: 's', name: 'data', id: 3 },
        { rule: 'optional', type: 'ns', name: 'ns', id: 4 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 5,
        },
        {
          rule: 'optional',
          type: 'int32',
          name: 'last_bar_close',
          id: 6,
        },
      ],
    },
    {
      name: 'ns',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'd', id: 1 },
        { rule: 'optional', type: 'bool', name: 'nochange', id: 2 },
        { rule: 'repeated', type: 'int32', name: 'indexes', id: 3 },
      ],
    },
    {
      name: 'st',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'int32', name: 'i', id: 1 },
        { rule: 'repeated', type: 'double', name: 'value', id: 2 },
      ],
    },
    {
      name: 's',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'int32', name: 'i', id: 1 },
        { rule: 'repeated', type: 'double', name: 'value', id: 2 },
      ],
    },
    {
      name: 'symbol_resolved',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_name',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_info',
          id: 3,
        },
        { rule: 'optional', type: 'int32', name: 'time', id: 4 },
      ],
    },
    {
      name: 'studies_metadata',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'meta_name',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'metadata', id: 3 },
      ],
    },
    {
      name: 'qsd',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_name',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'status', id: 3 },
        { rule: 'optional', type: 'string', name: 'values', id: 4 },
        { rule: 'optional', type: 'double', name: 'lp', id: 5 },
        { rule: 'optional', type: 'float', name: 'ch', id: 6 },
        { rule: 'optional', type: 'float', name: 'chp', id: 7 },
        {
          rule: 'optional',
          type: 'double',
          name: 'high_price',
          id: 8,
        },
        {
          rule: 'optional',
          type: 'double',
          name: 'low_price',
          id: 9,
        },
        { rule: 'optional', type: 'double', name: 'volume', id: 10 },
        { rule: 'optional', type: 'double', name: 'rtc', id: 11 },
        { rule: 'optional', type: 'float', name: 'rch', id: 12 },
        { rule: 'optional', type: 'float', name: 'rchp', id: 13 },
        { rule: 'optional', type: 'float', name: 'bid', id: 14 },
        { rule: 'optional', type: 'float', name: 'ask', id: 15 },
        { rule: 'optional', type: 'float', name: 'bid_size', id: 16 },
        { rule: 'optional', type: 'float', name: 'ask_size', id: 17 },
        { rule: 'optional', type: 'string', name: 'rest', id: 19 },
      ],
    },
    {
      name: 'quote_list_fields',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'fields', id: 2 },
      ],
    },
    {
      name: 'quote_completed',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'symbol_name',
          id: 2,
        },
      ],
    },
    {
      name: 'depth_symbol_success',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
      ],
    },
    {
      name: 'depth_symbol_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
        { rule: 'optional', type: 'string', name: 'reason', id: 3 },
      ],
    },
    {
      name: 'depth_symbol_cleared',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
      ],
    },
    {
      name: 'dd',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'depth_data',
          name: 'depth_data',
          id: 2,
        },
      ],
    },
    {
      name: 'depth_data',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'symbol', id: 1 },
        { rule: 'optional', type: 'double', name: 'left', id: 2 },
        { rule: 'optional', type: 'double', name: 'right', id: 3 },
        { rule: 'repeated', type: 'bs', name: 'bids', id: 4 },
        { rule: 'repeated', type: 'bs', name: 'asks', id: 5 },
      ],
    },
    {
      name: 'bs',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'double', name: 'price', id: 1 },
        { rule: 'optional', type: 'double', name: 'volume', id: 2 },
      ],
    },
    {
      name: 'depth_bar_last_value',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'symbol', id: 2 },
        {
          rule: 'optional',
          type: 'double',
          name: 'last_value',
          id: 3,
        },
      ],
    },
    {
      name: 'pointset_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'set_id', id: 2 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 3,
        },
      ],
    },
    {
      name: 'replay_point',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'int32', name: 'time', id: 3 },
      ],
    },
    {
      name: 'replay_ok',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
      ],
    },
    {
      name: 'replay_error',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'turnaround',
          id: 2,
        },
        { rule: 'optional', type: 'string', name: 'reason', id: 3 },
        { rule: 'optional', type: 'string', name: 'info', id: 4 },
      ],
    },
    {
      name: 'replay_resolutions',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        {
          rule: 'optional',
          type: 'string',
          name: 'base_resolution',
          id: 2,
        },
        {
          rule: 'optional',
          type: 'string',
          name: 'min_resolution',
          id: 3,
        },
      ],
    },
    {
      name: 'replay_data_end',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
      ],
    },
    {
      name: 'replay_instance_id',
      syntax: 'proto2',
      fields: [
        { rule: 'optional', type: 'string', name: 'session', id: 1 },
        { rule: 'optional', type: 'string', name: 'id', id: 2 },
      ],
    },
  ],
  isNamespace: !0,
}
