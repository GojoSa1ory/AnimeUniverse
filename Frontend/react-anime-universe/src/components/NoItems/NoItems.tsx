import './noitems.scss'

function NoItems({title}: {title: string | undefined}) {
  return (
    <section className='noitems-container'>
        <h1 className='noitems-title'>{title}</h1>
        <img src='/images/loaders/fr.gif'/>
    </section>
  )
}

export default NoItems