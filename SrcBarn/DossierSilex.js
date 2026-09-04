const {
    arche, transDunamis, kataStasis,
    Mneme:{cascade, hyloTipos, recentView},
    Melete:{assignTo, getSections, getLinkText},
} = self.require("SrcBarn/DatumOvule.js");

const Melete = {
    isMessenger: hyle => Mneme.topos(hyle) &&
        transDunamis()(hyle).path.startsWith(arche.path.messenger),
    isSanctum: isTurret => dunamis =>
        String(transDunamis()(dunamis)?.path)
            .split("/")?.[0] === arche.path.sanctum && (
            !isTurret
            || transDunamis(true)(dunamis)?.file?.etags?.includes?.("#inDex")
        ),
    mintStamp: type => {
        type ??= "default";
        const noesis = {
            default: [
                app.vault.getFiles().map(file => file.basename),
                arche.format.stamp,
            ],
            mneme: [
                dv.pages(`"${arche.path.mneme}"`).map(x => x.file.name),
                arche.format.mneme.long,
            ],
        };
        let candStamp
        const [srcStamps, format] = noesis[type];
        do candStamp = moment().format(format)
        while (srcStamps.includes(candStamp));
        return candStamp;
    },
    setMorphen: async (target, variables) => {
        for (let [key,value] of Object.entries(target)) {
            if (typeof value === 'function')
                variables[key] = await value(variables[key])
            else if (variables[key] === undefined) variables[key] = value;
        }
    }
};
const Mneme = {
    tipos: hyle => {
        const noema = transDunamis(true)(hyle)?.[arche.prop.tipos]?.path;
        return dv.page(String(noema)) ?? null;
    },
    messengers: hyle => {
        hyle = transDunamis()(hyle);
        if(!hyle?.path)return []
        else return dv.pages(`[[${hyle.path}]]`)
            .where(Melete.isMessenger)
            .where(x=>Mneme.tipos(x)?.file?.path === hyle.path)
            .sort(x => x[arche.prop.time]?.toString?.() || moment(x[arche.prop.time]).format(),"desc")
            .array();
    },
    topos: hyle =>{
        const noema = {mu: 0, telos: transDunamis()(hyle)?.path};
        let kytos, isTelos=false;
        do{
            kytos = Mneme.tipos(noema.telos)?.file?.path;
            isTelos = noema.telos === kytos
            if(!kytos) return null;
            if(!isTelos){
                noema.mu++;
                noema.telos = kytos;
            }
        }while(!isTelos);
        return noema;
    },
    eidolon: dunamis => !Melete.isSanctum()(dunamis)? false:
        dv.page(String(transDunamis(true)(dunamis)?.[arche.prop.title]?.path))
        ?? cascade(dunamis).map(Mneme.eidolon).find(Boolean) ?? false,
};
const {kytos} = arche.path;
const getNoesei= isSpliced => async dunamis => {
    dunamis = transDunamis()(dunamis);
    const kytos = await getSections(dunamis)
        .then(x => x?.blocks[arche.format.eidos]?.text);
    const hyle = typeof kytos === "string"? kytos
        .split("\n")
        .filter(t=>['```','^'].every(x => !t.startsWith(x)) )
        .join("\n"): undefined;
    const tropos = noema =>{
        const {mu} = Mneme.topos(dunamis);
        for (const khora of ["eidos", "skia"]){
            if(isSpliced) delete noema[khora]
            else if(mu <= 1)noema[khora] = (noema[khora] ?? [])
                .reduce((a,d)=>a.add(Array.isArray(d)?new Set(d):d),new Set());
        }
        noema = !isSpliced? noema:
            {hexis:noema?.morphe?.hexis ?? noema};
        return{...noema,dunamis}
    };
    try {return tropos(JSON.parse(hyle))}
    catch (e){
        console.warn(`parsing ${dunamis?.name} aborted:`,e);
        return {dunamis};
    }
};
const kataArtisis = {
    '方付け': async param =>{
        console.log({...param.variables});
        await Melete.setMorphen({
            hyle: x => typeof x === 'string'? x.replace('.md','') + '.md':
                transDunamis()(x)?.path ?? Melete.mintStamp()+'.md',
            eidos: x=> Melete.isMessenger(x)? x:
                Mneme.messengers(x).shift(),
            eidolon: 'tab',
            skia: Boolean(app.vault.getFileByPath(kytos))
                && await app.vault.adapter.read(kytos),
        },param.variables)
        const {eidos,hyle,skia} = param.variables;
        if(!eidos) {
            console.error('source does not exist. aborting:',eidos);
            throw new Error();
        }
        for(const dunamis of [hyle, kytos]) if(!transDunamis()(dunamis))
            await app.vault.create(dunamis,"");
        await app.vault.read(transDunamis()(eidos))
            .then(t=>[t,obsidian.getFrontMatterInfo(t).frontmatter])
            .then(([t,f])=>f? t.replace("---\n"+f+"---\n",''): t)
            .then(t=>app.vault.modify(transDunamis()(kytos),t));

    },
    '片付け': async param =>{
        const {hyle, eidos, eidolon, skia} = param.variables;

        app.commands.executeCommandById("dataview:force-refresh-views");
        await kataStasis()(hyle);
        await app.vault.process(transDunamis()(hyle),t=>t.trimEnd())

        const ousia = transDunamis()(kytos);
        switch (typeof skia){
            case 'string': await app.vault.modify(ousia,skia); break;
            case 'boolean': if(!skia)await app.vault.delete(ousia); break;
            default: new Notice("付け型の扱いが見当たりませんでした。");
        }
        if(eidolon || eidolon === "") await app.workspace.openLinkText(hyle,"",eidolon);
    },
};
module.exports = {Mneme,Melete, getNoesei,kataArtisis};