import { HTTPError } from 'ky';
import { useForm, FieldValues, Path } from 'react-hook-form';

export const useApiForm = <FormValues extends FieldValues>() => {
  const {
    handleSubmit,
    control,
    reset,
    formState,
    setError,
    clearErrors,
  } = useForm<FormValues>();

  const handleApiErrors = async (error: HTTPError) => {
    if (error.response) {
      const responseJson = await error.response.json();

      if (error.response.status === 400) {
        const apiErrors: ValidationError<Path<FormValues>>[] = responseJson.message;
        apiErrors.forEach((error) => {
          setError(error.pointer, {
            type: 'validation',
            message: error.messages[0],
          });
        });
      } else if (error.response.status >= 400) {
        setError('root.server', {
          type: 'server',
          message: responseJson.message,
        });
      }
    }
  };

  return {
    handleSubmit,
    control,
    reset,
    formState,
    setError,
    clearErrors,
    handleApiErrors,
  };
};