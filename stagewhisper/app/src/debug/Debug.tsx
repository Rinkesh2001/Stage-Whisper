import { Button, Card, Stack, Title, Notification } from '@mantine/core';

import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
// import { createDebugEntries } from '../features/entries/entrySlice';
import { v4 as uuidv4 } from 'uuid';
import { getLocalFiles } from '../features/entries/entrySlice';

function Debug() {
  //#region Testing area

  interface notificationType {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }

  const [notifications, setNotifications] = useState<notificationType[]>([]);
  //#endregion

  const dispatch = useAppDispatch();
  // const notifications = [] as JSX.Element[];

  // const addNotification = (title: string, body: string) => {
  //   setNotifications((prev) => [...prev, { title, message: body, type: 'success', id: uuidv4() }]);
  // };

  return (
    <Stack>
      {notifications.map((notification) => (
        <Notification
          key={uuidv4()}
          title={notification.title}
          color={notification.type === 'success' ? 'teal' : 'red'}
          // type={notification.type}
          onClose={() => {
            console.log();
            setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
          }}
        >
          {notification.message}
        </Notification>
      ))}
      <Card withBorder>
        <Stack>
          <Title order={5} mb={'sm'}>
            Debug Menu
          </Title>

          <Button
            onClick={() => {
              // dispatch(createDebugEntries());
            }}
            variant="outline"
          >
            Create Debug Transcriptions
          </Button>
          <Button
            onClick={() => {
              if (window.Main) {
                // window.Main.loadDatabase().then((entries) => {
                //   console.log(entries);
                // });
                dispatch(getLocalFiles());
              } else {
                console.log('no window.Main');
              }
            }}
            variant="outline"
          >
            Load appData
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
              console.log('window.Main', window.Main);
              if (window.Main) {
                window.Main.resetApp().then(() => {
                  console.log('reset');
                });
              } else {
                console.log('no window.Main');
              }
            }}
          >
            Reset App
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

export default Debug;
