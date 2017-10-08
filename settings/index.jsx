
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
        <Select
          title="Error Correction Level"
          label="Error Correction Level"
          settingsKey="errorCorrectionLevel"
          options={[
            {name:"High", value:"H"},
            {name:"Medium-High", value:"Q"},
            {name:"Medium-Low", value:"M"},
            {name:"Low", value:"L"},
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);