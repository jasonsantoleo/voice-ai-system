export const testFormControls = [
    {
      name: "fullName",
      componentType: "input",
      type: "text",
      placeholder: "Enter your full name"
    },
    {
      name: "email",
      componentType: "input",
      type: "email",
      placeholder: "Enter your email"
    },
    {
      name: "role",
      componentType: "select",
      placeholder: "Select your role",
      options: [
        { id: "developer", label: "Developer" },
        { id: "designer", label: "Designer" },
        { id: "manager", label: "Project Manager" },
        { id: "analyst", label: "Business Analyst" }
      ]
    },
    {
      name: "startDate",
      componentType: "date",
      placeholder: "Select start date"
    },
    {
      name: "description",
      componentType: "textarea",
      placeholder: "Enter project description"
    }
  ];
  
  