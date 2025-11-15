import useTodoIcon from "./useTodoIcon";
import useAccountIcon from "./useAccountIcon";

export default function useIcons() {
  const { TodoIcon } = useTodoIcon();
  const { AccountIcon } = useAccountIcon();

  return {
    TodoIcon,
    AccountIcon,
  };
}
