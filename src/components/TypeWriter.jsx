import { Cursor, useTypewriter } from 'react-simple-typewriter';

const TypeWriter = ({ words }) => {

  const [text, count] = useTypewriter({
    words: words,
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <>
      <span className='mr-3'>{text}</span>
      <Cursor cursorColor='#2525ba' />
    </>
  )
}

export default TypeWriter