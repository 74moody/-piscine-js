const escapeStr = "` \\ /\" '";

const arr = Object.freeze([4, '2']);

const obj = Object.freeze({
	str: "string",
	num: 9,
	bool: false,
	undef: undefined

});

const nested = Object.freeze({
  arr: Object.freeze([4, undefined, '2']),
  obj: Object.freeze({
     str: "Nested..string",
     num: 1,
    bool: true
  })
});
