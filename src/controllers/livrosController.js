import livros from "../models/Livro.js";

class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static listarLivrosPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
            if(err) {
                res.status(400).send({message: `${err.message} - Id do livro não localizado`})
            } else {
                res.status(200).send(livros);
            }
        })
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`})
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com Sucesso"})

        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }

    static deletarLivro = async (req, res) => {
        try {
            const id = req.params.numeroPaginas;
            await livros.findByIdAndDelete(id)
            res.status(200).send({message: 'Livro removido com sucesso'})

        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros);
        })
    }
}


export default LivroController
