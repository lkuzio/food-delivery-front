package xyz.javista.controlleradvice;

import java.util.ArrayList;
import java.util.List;

public class ValidationErrorDTO {
    private final int status;
    private final String message;
    private List<CustomFieldError> fieldErrors = new ArrayList<>();

    ValidationErrorDTO(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public void addFieldError(String objectName, String path, String message) {
        CustomFieldError error = new CustomFieldError(objectName, path, message);
        fieldErrors.add(error);
    }

    public List<CustomFieldError> getFieldErrors() {
        return fieldErrors;
    }
}
