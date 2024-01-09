
module.exports = function (source) {
    let imports = '';
    let concat = 'export default [].concat([]';
    let i = 0;
    for(line of source.replace('\r','').split('\n')) {
        line = line.split('//')[0].trim();
        if(!line) continue;
        const id = `questions${i++}`;
        imports += `import ${id} from './${line}.qs';\n`;
        i++;
        concat += `,${id}`;
    }
    concat += ');';
    const script = imports + concat;
    return script;
}