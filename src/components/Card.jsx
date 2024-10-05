
export default function Card({ card, handleClick }) {
  return (
    <div className='grid-item' >
            <img src={card.Image} onClick={() => handleClick(card)}  draggable="false"/>
            {card.artist[0].name}
    </div>
  )
}
