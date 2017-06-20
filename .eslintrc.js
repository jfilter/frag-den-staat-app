module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native",
        "jsx-a11y",
        "import"
    ],
    "parserOptions": {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module"
    },
    "rules": {
        "react/jsx-filename-extension": "off",
        "no-underscore-dangle": "off",
        "arrow-body-style": "off",
    },
    "globals": {
        "fetch": false,
        "require": false,
        "navigator": false,
    }
};
