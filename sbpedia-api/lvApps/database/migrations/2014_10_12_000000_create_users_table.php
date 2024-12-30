<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_type')->nullable();
            $table->bigInteger('person_id')->nullable();
            $table->string('username')->nullable();
            $table->string('password');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('secret_question')->nullable();
            $table->string('write_question')->nullable();
            $table->string('secret_question_answer')->nullable();
            $table->string('activation_key')->nullable();
            $table->string('left_after_complete')->nullable();
            $table->string('last_login')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->string('last_login_browser')->nullable();
            $table->string('created_ip')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->tinyInteger('is_organization')->nullable();
            $table->text('old_data')->nullable();
            $table->bigInteger('user_group_id')->nullable();
            $table->tinyInteger('is_old_database')->nullable(); 
            $table->bigInteger('user_sub_group_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
