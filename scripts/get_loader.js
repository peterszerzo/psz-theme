require('babel-core/register');

const Loader = require('../src/components/loader/loader.jsx').default;
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

console.log(renderToStaticMarkup(React.createElement(Loader)));
