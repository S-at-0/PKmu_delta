// noinspection FallThroughInSwitchStatementJS

const arche = {
    tipos: [
        ["set", Set],
        ["map", Map],
        ["date", Date],
        ["array", Array],
        ["regexp", RegExp],
        ["promise", Promise],
        ["file", obsidian.TFile],
        ["folder", obsidian.TFolder],
        ["any", obsidian.TAbstractFile],
    ],
    format:{
        eidos: 'gzb0',
        fragment: n => '^gzb'+ String(n),
        contain: '⊃',
        est: '∋',
        linkAlias: /\[|]|.*\|/g,
        stamp: 'YY-DDDD-ssSS',
        mneme: {
            short: 'YYYY-MM-dd',
            long: 'YYYY-MMdd-HHmm-ssSS',
        },
        isStamp: /^\d{2}-\d{3}-\d{4}$/,
        isMneme: {
            short: /^\d{4}-\d{2}-\d{2}$/,
            long:/^\d{4}-\d{4}/,
        },
        strong: {
            display: 'block',
            margin: 'auto',
            fontSize: '2rem',
            color: '#232f3e',
            height:'fit-content',
            width: 'fit-content',
            backgroundColor: '#FF9900'
        },
    },
    prop: {
        cascade: "カタ",
        title: "通り名",
        time: "とき",
        date: "日付",
        tipos: "型",
    },
    path: {
        sanctum: "_",
        cabinet: "_事地",
        logos: "_事地/言葉",
        mneme: "_事地/公験",
        tally: "_事地/手形",
        tessera: "_事地/手形/_券契",
        messenger: "SrcBarn/付け型",
        kytos: "SrcBarn/付け型/付け型.md",
    },
};
    
const noesis = {
    setBlocks:(targCache,srcText)=>{
        const result = structuredClone(targCache?.blocks ?? {});
        for(const [key,value] of Object.entries(result)){
            const targVal = ['start', 'end'].map(k => value.position[k].offset)
            result[key] = {
                start: targVal[0],
                end: targVal[1],
                text: srcText.slice(...targVal),
            };
        }
        return result;
    },
    setHeadings:(targCache,srcText)=>{
        const result = Array.from(targCache?.headings ?? []);
        for(const [key,value] of result.entries()){
            const {heading,level,position} = value;
            const start = position.start.offset;
            const nextHead = result.slice(key + 1).find(x => x.level <= level);
            const end = nextHead ? nextHead.position.start.offset - 1 :
                result[result.length - 1].position.end.offset;
            result[key] = {heading, level, start, end, text: srcText.slice(start, end)};
        }
        return result;
    },
};

const transDunamis = isKhorai => hyle => {
    const sema = typeof hyle === "object"?
        hyle?.file?.path ?? hyle?.path: hyle;
    return isKhorai? dv.page(String(sema)) :
        app.metadataCache.getFirstLinkpathDest(String(sema), "") ||
        app.vault.getFileByPath(sema) ||
        app.vault.getFolderByPath(sema) ||
        app.vault.getAbstractFileByPath(sema);
};
const kataStasis = khorai => async hyle =>{//TODO mintStampと入れ替え
    const kytos = setTimeout(_=>{throw new Error("getting TFile timeout")},500);
    while(!transDunamis()(hyle)) await sleep(5); clearTimeout(kytos);
    if(!khorai) return transDunamis()(hyle);

    let noesis;
    const khora = (stasis, aporia) =>{
        const antiStasis =_=>aporia(new Error("waiting for Event timeout"));
        const kytos = setTimeout(antiStasis,1000);
        const kinesis = async (tropos,dunamis,skia) =>{
            const isNoema = dunamis.path === transDunamis()(hyle).path
                && (Mneme.hyloTipos(khorai) !== "function" || await khorai(tropos,dunamis,skia))
            if(isNoema){
                clearTimeout(kytos);
                stasis(dunamis);
            }
        };
        noesis = app.metadataCache.on("dataview:metadata-change", kinesis);
    }
    try{return await new Promise(khora)}
    finally{app.metadataCache.offref(noesis)}
};
const Mneme = {
    recentView: _=> app.workspace.getMostRecentLeaf()?.view,
    hyloTipos: hyle => {
        const noema = arche.tipos.find(x => hyle instanceof x[1])?.[0];
        if(noema) return noema
        else return hyle === null? "null":
            transDunamis()(hyle?.file?.path)? "page":
            moment.isMoment(hyle)? "moment":
            Number.isNaN(hyle)? "nan":
            typeof hyle === "number" && !isFinite(hyle)? "infinity":
            typeof hyle !== "string"
                && typeof hyle?.[Symbol.iterator] === "function"
                ? "iterable":
            typeof hyle;
    },
    retrorse: (noesis,khora = dv.pages("").array()) => hyle =>{
        const {path} = transDunamis()(hyle);
        const tropos = dunamis => [noesis(dunamis)].flat()
            .map(x=>transDunamis()(x)?.path).includes(path);
        return khora.filter(tropos);
    },
    cascade: (hyle, isRelative = true) =>
        [transDunamis(true)(hyle)?.[arche.prop.cascade]]
            .flat().map(l => l?.path)
            .map(transDunamis(isRelative))
            .filter(Boolean),
};
const Melete = {
    assignTo: async function f(ousia, khora, noema, ...tropos){
        ousia = transDunamis()(ousia);
        let isDunamis = false;
        const kinesis = prop => {
            if (Array.isArray(prop[khora])){
                const kytos = new Set([...prop[khora], ...[noema].flat()]);
                prop[khora] = [...kytos].filter(Boolean);
            }
            else if (!prop[khora]) prop[khora] = noema
            else if (tropos.length) isDunamis = true;
        }
        await app.fileManager.processFrontMatter(ousia,kinesis);
        if(isDunamis) await f(ousia, tropos.shift(), noema, ...tropos);
    },
    flipTo: async (dir, hyle) => {
        const targDos = transDunamis()(hyle);
        if (! targDos || typeof dir !== "string")
            throw new Error("incorrect argument at flipTo()");

        const folders = obsidian.normalizePath(dir).split("/").filter(Boolean);
        const candPath = folders.join("/") + "/" + targDos.name;
        const targPath = candPath.replace(/^\//, '');
        for (const i of folders.keys()){
            const candDir = folders
                .slice(0, i + 1)
                .join("/");
            if (!transDunamis()(candDir) instanceof obsidian.TFolder)
                await app.vault.createFolder(candDir);
        }
        await app.fileManager.renameFile(targDos, targPath);
        return transDunamis()(targPath);
    },
    getSections: async hyle =>{
        const targDos = transDunamis()(hyle);
        if(targDos?.extension !== 'md'){
            console.warn(`getSections:${targDos?.path} not defined`)
            return null;
        }
        const srcText = await app.vault.read(targDos);
        const targCache = app.metadataCache.getFileCache(targDos);
        return {
            blocks: noesis.setBlocks(targCache,srcText),
            headings: noesis.setHeadings(targCache,srcText),
        }
    },
    getLinkText: async (hyle, option) => {
        const targDos = transDunamis()(hyle);
        if (! targDos) return "";

        const targCache = app.metadataCache.getFileCache(targDos);
        const candText = app.metadataCache.fileToLinktext(targDos, "");

        const candSec = await Melete.getSections(targDos);
        const targSubPath = candSec?.blocks[option]? '#^'+option :
            candSec?.headings?.map(x => x.heading).includes(option) ? '#'+option : "";

        const candTitle = !targSubPath && typeof option === "string" ?
            option : undefined;
        let targTitle = candTitle ??
            targCache?.frontmatter?.[arche.prop.title] ??
            targCache?.frontmatter?.aliases?.[0];

        if (option && !(targSubPath || targTitle)) {
            targTitle = await qa.inputPrompt("方元の通り名(任意):");
            if (targTitle && transDunamis(true)(targDos))
                await app.fileManager.processFrontMatter(
                    targDos, prop => prop[arche.prop.title] = targTitle
                );
        }
        targTitle = targTitle?.replaceAll(arche.format.linkAlias, "");

        const linkStop = targTitle ? `|${targTitle}]]` : "]]";
        return "[[" + candText + targSubPath + linkStop;
    },
};

module.exports = {
    arche, Mneme, Melete,
    transDunamis, kataStasis,
};