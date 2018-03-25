package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/admin/directory/v1"
)

type FormSubmit struct {
	Name             string `json:"name"`
	AlternativeEmail string `json:"email"`
	Team             string `json:"team"`
	Code             string `json:"code"`
}

type FormResponse struct {
	Message string `json:"Answer:"`
}

func HandleLambdaEvent(event FormSubmit) (FormResponse, error) {
	return FormResponse{Message: fmt.Sprintf("%s is %d years old!", event.Name, event.Age)}, nil
}

func main() {
	lambda.Start(HandleLambdaEvent)
}
