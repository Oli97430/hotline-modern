package hub

import "encoding/json"

func mustMarshal(v interface{}) json.RawMessage {
	data, _ := json.Marshal(v)
	return data
}

func dmChannelKey(a, b string) string {
	if a < b {
		return "dm:" + a + ":" + b
	}
	return "dm:" + b + ":" + a
}
