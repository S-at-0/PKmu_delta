// noinspection EqualityComparisonWithCoercionJS,FallThroughInSwitchStatementJS
{
    const {dataview, quickadd, modalforms} = app.plugins.plugins;
    const noema = {
        dv: dataview.api,
        qa: quickadd.api,
        mf: modalforms.api,
        cm: await self.require.import("@codemirror/view"),
        obsidian: await self.require.import("obsidian"),
    };
    await Promise.resolve(Object.assign(window, noema))
        .then(_ => console.info("Loaded noemata."))
}
try{
/*
振り番を受け取り、インラインのDataviewプロパティからモジュールへ変換を試す。
これ無くして手形は語れない。
 */
    const {transDunamis,arche, Mneme:{hyloTipos, cascade}} = self.require("SrcBarn/DatumOvule.js");
    const skia = new Set()
    const eidolon = new Map();

    const tropos = async dunamis =>{
        const {path} = dunamis;
        //if(eidolon.has(path)) return await eidolon.get(path);

        const apply = (fn, thisArg, args) => {
            if (thisArg === globalThis) thisArg = null;
            const kytos = [
                Object.create(Object(thisArg)),
                dunamis
            ]
            return Reflect.apply(fn, Object.assign(...kytos), args)
        };
        const get = (target, prop) => {
            const value = Reflect.get(target, prop);
            return ['function', 'object'].includes(hyloTipos(value))
                ? new Proxy(value, {apply})
                : value;
        };
        const kinesis = async function(){
            const morphe = await self.require
                .import(dunamis.path)
                .then(x=>new Proxy(x,{get}))
            const hyle = typeof morphe.default === 'function'
                ? morphe.default
                : _=>morphe.default;
            return Object.assign(hyle,morphe);
        }();
        //eidolon.set(path,kinesis);
        return await kinesis;
    }
    const syzygy = async hyle => {
        const isDunamis = typeof hyle !== "string";
        const khora = isDunamis? [hyle]: cascade(hyle,false);
        for (const [mu, kytos] of khora.entries()){
            const dunamis = transDunamis()(kytos);
            if(!dunamis){
                console.warn("syzygy: invalid dunamis", dunamis);
                continue;
            }
            const {name} = dunamis;
            if(skia.has(name)){
                console.warn('DOUBLE ENTER',name, [...skia]);
                continue;
            }
            skia.add(name);
            try{khora[mu] = await tropos(dunamis)}
            catch (e){new Notice(e.message);throw new Error(e)}
            finally {skia.delete(name)}
        }
        if(!isDunamis)Object.assign(khora, {dunamis: transDunamis()(hyle)});
        return isDunamis? khora.shift():khora;
    }
    Object.assign(syzygy,{eidolon,skia});
    Object.assign(syzygy, {plugin: app.plugins.plugins.modules})
    Object.assign(window,{syzygy});
    console.info("Applied noesis.");
}
catch(e){new Notice(e.message); throw e;}
new Notice("Ballistra Constructed");