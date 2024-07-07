const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);
    if (isType(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
    const isBoolean = typeof isFavourite === 'boolean';
    if (!isBoolean) return;
    return isFavourite.includes('true') || ('false');
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
    const parsedType = parseType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedIsFavourite,
    };
};
