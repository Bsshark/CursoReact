import { useForm } from '../hooks/useForm';

export const TodoAdd = ({onNewTodo}) => {

    const {desc, onInputChange, onResetForm} = useForm({
      desc: ''
    });

    const onFormSubmit = (e) => {
        e.preventDefault();

        if(desc.length <= 1) return;

        const newTodo = {
          id: new Date().getTime(),
          done: false,
          desc: desc
        }

        onNewTodo(newTodo);
        onResetForm();
    }

  return (
    <form onSubmit={onFormSubmit}>
        <input  
          type="text" placeholder="¿Qué hay que hacer" className="form-control"
          name='desc' value={ desc } onChange={onInputChange}/>
        <button 
          type="submit" className="btn btn-outline-primary mt-1">Agregar</button>
    </form>
  )
}
