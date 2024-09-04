import { MaterialRepository } from "./material.repository.js";
import { upload } from "../config/multer.js";
import { uploadFile } from "../utils/uploadFile.js";
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
    upload.single('image')(req, res, async (err) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        try {
            const body = req.body;
            const image = req.file;
            let imageUrl = null;
            if (image) {
                const { downloadURL } = await uploadFile(image);
                imageUrl = downloadURL;
            }
            const materialNew = {
                image: imageUrl,
                name: body.name,
                description: body.description,
                brand: body.brand,
                category: body.category,
                stock: body.stock,
                cost: body.cost
            };
            const material = await repository.add(materialNew);
            res.status(201).send(material);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
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