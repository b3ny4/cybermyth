
module.exports = function (source) {
    let imports = '';
    let concat = 'export default [].concat([]';
    let i = 0;
    for(line of source.replace('\r','').split('\n')) {
        const id = `questions${i++}`;
        imports += `import ${id} from 'raw-loader!./questions/${line}';\n`;
        i++;
        concat += `,${id}`;
    }
    concat += ');';
    const script = imports + concat;
    console.log(script);
    return script;
}