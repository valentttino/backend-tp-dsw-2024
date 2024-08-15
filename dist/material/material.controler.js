import { MaterialRepository } from "./material.repository.js";
const repository = new MaterialRepository();
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const idSearch = req.params.id;
    const material = await repository.findOne({ id: idSearch });
    if (!material) {
        return res.status(404).send({ message: 'Material not found' });
    }
    res.json(material);
}
async function add(req, res) {
    const body = req.body;
    const materialNew = {
        name: body.name,
        description: body.description,
        stock: body.stock,
        cost: body.cost
    };
    const material = await repository.add(materialNew);
    return res.status(201).send(material);
}
async function update(req, res) {
    let body = req.body;
    body.id = req.params.id;
    const material = await repository.update(body.id, body);
    if (!material) {
        return res.status(404).send({ message: 'Material not found' });
    }
    res.status(200).send(material);
}
async function remove(req, res) {
    const id = req.params.id;
    const material = await repository.delete({ id });
    if (!material) {
        res.status(404).send({ message: 'Material not found' });
    }
    else {
        res.status(200).send({ message: 'Material deleted successfully' });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=material.controler.js.map