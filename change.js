let sourceObject = {
    key1: 'value1',
    key2: 'value2'
  };
  
  function get(key) {
    return sourceObject[key];
  }
  
  function set(key, value) {
    sourceObject[key] = value;
    return value;
  }