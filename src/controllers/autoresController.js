import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if(err) {
                res.status(400).send({message: `${err.message} - Id do autor não localizado`})
            } else {
                res.status(200).send(autores);
            }
        })
    }

    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar autor`})
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "autor atualizado com Sucesso"})

        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }

    static deletarAutor = async (req, res) => {
        try {
            const id = req.params.numeroPaginas;
            await autores.findByIdAndDelete(id)
            res.status(200).send({message: 'autor removido com sucesso'})

        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }
}


export default AutorController
