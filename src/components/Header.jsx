
export default function Header(props) {
  return (
    <div className='header'>
        <h1>Magik Memory</h1>
        <div className="header--paragraphs">
            <p>Current Score: {props.currScore}</p>
            <p>Max Score: {props.maxScore}</p>
        </div>
    </div>
  )
}
