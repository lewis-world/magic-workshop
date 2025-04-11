// components/MagicForum.jsx
import { useActionState, useOptimistic } from 'react';
import { submitPost } from './magicApi';
import { FaDove } from 'react-icons/fa6';
import './MagicForum.css'
function MagicForum() {
  const [posts, dispatch, isPending] = useActionState(
    async (prevPosts, formData) => {
      try {
        const newPost = {
          content: formData.get('content'),
          id: `temp_${Date.now()}`
        };
        
        const res = await submitPost(newPost);
        return [...prevPosts, { ...newPost, id: res.id }];
      } catch (error) {
        console.error('咒语反噬:', error);
        return prevPosts;
      }
    },
    []
  );

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost]
  );

  return (
    <div className="ancient-scroll">
      <form action={async (formData) => {
        const tempPost = {
          id: `temp_${Date.now()}`,
          content: formData.get('content')
        };
        addOptimisticPost(tempPost);
        dispatch(formData);
      }}>
        <textarea 
          name="content"
          aria-label="魔法卷轴内容"
          maxLength={500}
        />
        <br />
        <button disabled={isPending}>
          {isPending ? (
            <>
              <FaDove className="flapping" />
              猫头鹰飞行中...
            </>
          ) : '发布咒语'}
        </button>

        {isPending && (
          <div className="spell-feedback">
            <FaDove className="flying-owl" />
            <p>猫头鹰正在飞往霍格沃茨...</p>
          </div>
        )}
      </form>

      
    </div>
  );
}

export default MagicForum;