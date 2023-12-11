const filterObject = (obj, ...allowField) => {
    const newObject = {};
    Object.keys(obj).forEach((ele) => {
        if (allowField.includes(ele)) newObject[ele] = obj[ele];
    });
    return newObject;
};

module.exports = { filterObject };
