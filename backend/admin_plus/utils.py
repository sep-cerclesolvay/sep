from django.apps import apps


def get_models_as_dict(include_auto_created=False, include_swapped=False):
    apps.check_models_ready()

    result = dict()
    for app_config in apps.app_configs.values():
        models = [model for model in app_config.get_models(
            include_auto_created, include_swapped)]
        if len(models) > 0:
            result[app_config] = models
    return result


def get_database_usage(type='name', limit=None, max_usage=None):

    app_models = get_models_as_dict(include_auto_created=True)

    result = None
    if type == 'name':
        result = dict()
    else:
        result = []

    total = 0

    for config, models in app_models.items():
        config_name = config.verbose_name
        if type == 'name' and result.get(config_name) == None:
            result[config_name] = dict()

        for model in models:
            model_name_plural = model._meta.verbose_name_plural.title()
            count = model.objects.count()
            total += count
            if type == 'name':
                result[config_name][model_name_plural] = count
            else:
                result.append(
                    (config_name, model_name_plural, count)
                )

    if type == 'name':
        result_sorted_by_config_name = dict(sorted(
            result.items(), key=lambda x: x[0].lower()))
        for key in result_sorted_by_config_name:
            result_sorted_by_config_name[key] = dict(
                sorted(
                    result_sorted_by_config_name[key].items(),
                    key=lambda x: x[0].lower()
                )
            )
        return result_sorted_by_config_name

    result.sort(key=lambda x: x[2], reverse=True)

    if limit != None and len(result) > limit:
        rest = 0
        slice_pos = limit - 1
        if max_usage != None:
            slice_pos -= 1

        left_result = result[:slice_pos]
        right_result = result[slice_pos:]

        for _, _, count in right_result:
            rest += count

        result = left_result
        result.append(('Rest', 'Rest', rest))

        if max_usage != None:
            result.append(('Free', 'Free', max_usage - total))

    return result
