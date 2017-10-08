
console.log("Opening Settings page");

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">QR Settings</Text>}>
        <TextInput
          title="String to Encode"
          label="String to Encode"
          settingsKey="codeString"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);