import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; 
import { Send } from '../icons';
import { useChat } from '../contexts/index';
import { useTextareaRef } from '../hooks/index';


const ChatBox = () => {
  const { prompt, handleSendPrompt, handlePromptChange, handleKeyDown, loading, currentChat } = useChat();
  const textareaRef = useTextareaRef(prompt);

  return (
    <section className='w-full h-[calc(100dvh-156px)] flex flex-col justify-between items-center gap-y-8'>
      
      {
        currentChat.length > 0 

        ? (

          <div className='w-full overflow-y-scroll'>

            <div className='w-[95%] lg:w-[70%] 2xl:w-[80%] mx-auto pr-4 flex flex-col gap-y-4'>
              
              {

                currentChat.map((message, index) => (
                    message.sender === 'user' 

                    ? (

                      <p key={index} className='bg-dark-gray w-fit text-white text-xs sm:text-sm leading-8 px-4 py-1 ml-auto rounded-xl'>

                        {message.content}

                      </p>

                    ) : (

                      <div key={index}  className='flex items-start gap-x-2'>

                        <img src='./zai.svg' alt='ZAI Logo' className='mt-2 select-none' />

                        <div className={'max-w-full text-white text-xs sm:text-sm leading-8 ai-response'}>

                          {

                          message.content === 'Loading' 

                          ? 'Just a sec...' 

                          : <ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]}  rehypePlugins={[rehypeHighlight]} />

                          }

                        </div>

                      </div>

                    )

                ) )

              }

            </div>

          </div>
        )

        : (

            <>
            
              <h1></h1>

              <h1 className='text-white text-xl sm:text-3xl'>Meet ZAI <br /> Your personal AI assistant</h1>
            
            </>

        )

      }
      
      <div className='bg-dark-gray w-[90%] lg:w-[60%] 2xl:w-[70%] p-4 rounded-xl flex justify-between items-end gap-x-4'>

        <textarea ref={textareaRef} placeholder='Type here...' value={prompt} onChange={handlePromptChange} onKeyDown={handleKeyDown} className='!max-h-[100px] pr-2 text-white text-sm sm:text-base flex-1 resize-none placeholder:text-gray-200 focus:outline-none'></textarea>

        <button type='button' onClick={() => handleSendPrompt(prompt)} disabled={loading} className={`bg-body  text-2xl p-1 rounded-full ${loading ? 'text-light-gray  pointer-events-none' : 'text-white cursor-pointer hover:opacity-60'} select-none`}><Send /></button>

      </div>

    </section>
  );
};

export default ChatBox;