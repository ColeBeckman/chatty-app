'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  sendMessage: () => void;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
}
const ChatForm = (props: Props) => {
  const { sendMessage, currentMessage, setCurrentMessage } = props;
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 flex-col p-4 w-full max-height-[115px] bg-background-darker"
    >
      <Input
        type="text"
        placeholder="Enter Message"
        value={currentMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentMessage(e.target.value)
        }
      />

      <Button disabled={!currentMessage.trim()}>Send Message</Button>
    </form>
  );
};
export default ChatForm;
