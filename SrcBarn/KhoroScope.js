const status = dv.span("⏳初期化中…");
const start = Date.now()
while (!globalThis?.syzygy?.isReady){
    await sleep(200);
    if(Date.now() - start > 5000) throw new Error(dv.current().file.name+": khoroScope timeout");
} status.remove();
syzygy.isReady = false;
dv.container.empty();
try{
    const {transDunamis} = await self.require.import("SrcBarn/DatumOvule.js");
    const {Mneme:{tipos},getNoesei} = await self.require.import("SrcBarn/DossierSilex.js");
    const noema = await getNoesei(true)(input);
    const {dunamis,hexis:{isHyle}={}} = Object(noema);
    const noesis = transDunamis()(isHyle? tipos(dunamis) : dunamis);
    if(!noesis)dv.span("⚠️眺めがありません")
    else await syzygy(noesis)
        .then(f=>f.call(dv,noema))
        .catch(e =>{console.error(e);new Notice(e.message)});
} finally{syzygy.isReady = true}