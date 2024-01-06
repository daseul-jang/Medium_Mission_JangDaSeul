import { WritePost } from '@/model/post';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  id?: string;
  type: 'write' | 'modify';
  initialPost: WritePost;
  submitFunction: (post: WritePost, id?: string) => void;
}

export const usePostForm = ({
  id,
  type,
  initialPost,
  submitFunction,
}: Props) => {
  const [post, setPost] = useState(initialPost);
  const [isPublic, setIsPublic] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [post.title]);

  const publicHandler = () => {
    setIsPublic(true);
  };

  const privateHandler = () => {
    setIsPublic(false);
  };

  const paidHandler = () => {
    setIsPaid(true);
  };

  const noPaidHandler = () => {
    setIsPaid(false);
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setPost((prevPost) => {
      const updatedPost = {
        ...prevPost,
        isPublic,
        isPaid,
      };

      if (type === 'modify') {
        submitFunction(updatedPost, id);
      } else {
        submitFunction(updatedPost);
      }

      return updatedPost;
    });
  };

  return {
    type,
    post,
    isPublic,
    isPaid,
    modalOpen,
    textareaRef,
    publicHandler,
    privateHandler,
    paidHandler,
    noPaidHandler,
    openModalHandler,
    closeModalHandler,
    handleOnChange,
    handleSubmit,
  };
};
