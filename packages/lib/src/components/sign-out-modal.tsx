import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { $api, InMemoryStore } from '@etu-access/lib';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function SignOutModal({ isOpen, onOpenChange }: Props) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate, isPending } = $api.useMutation('post', '/auth/sign-out', {
    onSuccess() {
      InMemoryStore.accessToken = undefined;
      InMemoryStore.refreshToken = undefined;
      queryClient.resetQueries({
        exact: false,
        queryKey: ['get', '/auth/sign-in/refresh-token'],
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('signOutModalTitle')}
            </ModalHeader>
            <ModalBody>
              <p>{t('signOutModalContent')}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t('cancel')}
              </Button>
              <Button
                color="danger"
                isLoading={isPending}
                onPress={() =>
                  mutate({
                    credentials: 'include',
                  })
                }
              >
                {t('signOut')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
